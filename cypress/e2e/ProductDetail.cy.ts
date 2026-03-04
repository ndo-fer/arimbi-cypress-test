import productPage from '../support/pages/ProductPage';

describe('Product Detail Page', () => {
    beforeEach(() => {
        // Ensure the user is logged in and on a product detail page before each test.
        cy.login();
        cy.visit('/');

        productPage.navigateToProductDetail();
        cy.url().should('include', 'detail-produk');
    });

    it('should display the main product details correctly', () => {
        productPage.elements.productDetailName().should('be.visible');
        productPage.elements.productDetailPrice().should('be.visible');
        productPage.elements.productDetailDescription().should('be.visible');
    });

    it('should allow selection of a product variant', () => {
        const sizeToSelect = 'L';
        productPage.elements.sizeVariantOption(sizeToSelect).should('be.visible').click();
        productPage.elements.activeVariant().should('exist').and('contain.text', sizeToSelect);
    });
});
