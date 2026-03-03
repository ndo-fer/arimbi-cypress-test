import loginPage from '../support/pages/LoginPage';
import productPage from '../support/pages/ProductPage';
import productSideDrawer from '../support/pages/ProductSideDrawer';

describe('Flow Belanja: Add to Cart', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.goToLoginPage();
    loginPage.login(user.validUser.noTelepon, user.validUser.password);
    cy.wait(5000);
  });

  it('Basic Flow: Add to Cart Via Sidebar', () => {
    productPage.scrollToProduct();
    productPage.openProductPreview();
    cy.wait(2000);
    productSideDrawer.addToCart();
    cy.contains('h5', 'Keranjang').should('be.visible');
    cy.contains('button', 'Bayar Sekarang').should('be.visible');
  });

  it('Alternate Flow: Add to Cart via Product Detail Page', () => {
    productPage.scrollToProduct();
    productPage.navigateToProductDetail(); // Navigate to the product detail page
    cy.url().should('include', '/detail-produk'); // Verify redirection to the detail page
    cy.wait(2000);
    productPage.addToCartFromDetail(); // Continue with the detail page flow
    cy.contains('h5', 'Keranjang').should('be.visible');
    cy.contains('button', 'Bayar Sekarang').should('be.visible');
  });
});