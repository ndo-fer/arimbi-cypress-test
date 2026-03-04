import productPage from '../support/pages/ProductPage';
import productSideDrawer from '../support/pages/ProductSideDrawer';

describe('Add to Cart Flow', () => {
    beforeEach(() => {
        // Ensure user is logged in and at the home page before each test.
        cy.login();
        cy.visit('/');
    });

    it('should add a product to the cart from the product preview sidebar', () => {
        productPage.scrollToProduct();
        productPage.openProductPreview();
        productSideDrawer.elements.sideDrawer().should('be.visible');
        productSideDrawer.addToCart();

        // Assertions: Verify the main cart drawer is now open
        cy.contains('h5', 'Keranjang').should('be.visible');
        cy.contains('button', 'Bayar Sekarang').should('be.visible');
    });

    it('should add a product to the cart from the product detail page', () => {
        productPage.scrollToProduct();
        productPage.navigateToProductDetail();
        cy.url().should('include', '/detail-produk');
        productPage.addToCartFromDetail();
        
        // Assertions: Verify the main cart drawer is now open
        cy.contains('h5', 'Keranjang').should('be.visible');
        cy.contains('button', 'Bayar Sekarang').should('be.visible');
    });
});
