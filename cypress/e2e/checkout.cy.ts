import loginPage from '../support/pages/LoginPage';
import productPage from '../support/pages/ProductPage';
import productSideDrawer from '../support/pages/ProductSideDrawer';
import checkoutPage from '../support/pages/CheckoutPage';
import { payWithMidtransSimulator } from '../support/utils/PaymentUtils';

describe('Flow Checkout: Payment Process', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    // 1. Check Session State & Login only if needed
    loginPage.visit();

    cy.get('body').then(($body) => {
      // Check if profile icon is visible (indicating logged in)
      if ($body.find('i.lni-user-4, i.lni-user').filter(':visible').length === 0) {
        cy.log('User not logged in. Proceeding to login.');
        loginPage.goToLoginPage();
        loginPage.login(user.validUser.noTelepon, user.validUser.password);
        cy.wait(5000);
        loginPage.elements.profileIcon().should('be.visible');
      } else {
        cy.log('User already logged in. Skipping login step.');
      }
    });

    // 2. Basic Flow: Add to Cart via Sidebar
    cy.wait(3000);
    productPage.scrollToProduct();
    productPage.openProductPreview();
    productSideDrawer.elements.sideDrawer().should('be.visible');
    // productSideDrawer.addToCart();
    productSideDrawer.buyNow();
    // cy.contains('h5', 'Keranjang').should('be.visible');
  });

  const scenarios = [
    // { shipping: 'KOMERCE', payment: 'QRIS' },
    { shipping: 'JNE Express (Regular)', payment: 'BNI (VA)' },
    { shipping: 'KURIR EXPRESS', payment: 'BCA (VA)' },
    { shipping: 'Si Cepat (Express 25)', payment: 'Mandiri (VA)' },
    { shipping: 'Gojek Express 25', payment: 'BRI (VA)' },
    { shipping: 'GOJEK', payment: 'Indomaret' },
    { shipping: 'JNT Express', payment: 'Alfamart Counter' },
    // Sisa shipping yang belum kebagian pasangan, putar ulang payment-nya
    // { shipping: 'JNT CARGO 2', payment: 'QRIS' },
    // { shipping: 'GRAB 2', payment: 'BCA (VA)' }
  ];

  scenarios.forEach(({ shipping, payment }) => {
    it(`Should checkout with ${shipping} and ${payment}`, () => {
      // productPage.proceedToCheckout();
      
      checkoutPage.selectShippingMethod(shipping);
      checkoutPage.selectPaymentMethod(payment);
      checkoutPage.placeOrder();
      checkoutPage.confirmPayment();

      // Strict UI Verification (Silver Standard)
      // 1. Wait for Modal (15s timeout)
      cy.get('.modal.show', { timeout: 15000 })
        .filter(':visible')
        .first()
        .as('paymentModal')
        .scrollTo('bottom', { ensureScrollable: false });

      // 2. Conditional Logic
      if (payment === 'QRIS') {
        // QRIS: Check for image source
        cy.get('@paymentModal').find('img').should('have.attr', 'src').and('match', /midtrans|qr/i);
        
        checkoutPage.elements.finishLaterBtn().scrollIntoView().should('be.visible');
        checkoutPage.elements.refreshStatusBtn().scrollIntoView().should('be.visible');
      } else {
        // Wait for modal content to stabilize (VA numbers/codes to appear)
        cy.wait(2000);
        payWithMidtransSimulator(payment);
      }
    });
  });
});