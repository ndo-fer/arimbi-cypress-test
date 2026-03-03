import loginPage from '../support/pages/LoginPage';
import productPage from '../support/pages/ProductPage';

describe('Skenario Halaman Detail Produk', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    // Conditional login check
    cy.get('body').then(($body) => {
      if ($body.find('.total-items').length === 0) {
        cy.log('User not logged in. Proceeding to login.');
        loginPage.goToLoginPage();
        loginPage.login(user.validUser.noTelepon, user.validUser.password);
        cy.wait(5000);
        loginPage.elements.notificationBadge().should('be.visible');
      } else {
        cy.log('User already logged in. Skipping login step.');
      }
    });

    // Navigate to a product detail page
    productPage.elements.productCard().click();
    cy.url().should('include', 'detail-produk');
    cy.wait(2000);
  });

  it('Harus menampilkan detail produk dengan benar', () => {
    productPage.elements.productDetailName().should('be.visible');
    productPage.elements.productDetailPrice().should('be.visible');
    productPage.elements.productDetailDescription().should('be.visible');
  });

  it('Harus bisa memilih varian produk (ukuran)', () => {
    const sizeToSelect = 'L'; // Example size
    productPage.elements.sizeVariantOption(sizeToSelect).should('be.visible').click();
    
    // Assert that the clicked variant is now active
    productPage.elements.activeVariant().should('exist').and('contain.text', sizeToSelect);
  });
});