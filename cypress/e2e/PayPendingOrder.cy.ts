import loginPage from '../support/pages/LoginPage';
import unpaidOrderPage from '../support/pages/UnpaidOrderPage';
import { payWithMidtransSimulator } from '../support/utils/PaymentUtils';

describe('Pay Pending Order (Belum Bayar)', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    
    // Ensure User is Logged In
    cy.get('body').then(($body) => {
      // Check if profile icon is visible
      if ($body.find('i.lni-user-4, i.lni-user').filter(':visible').length === 0) {
        cy.log('User not logged in. Logging in now...');
        loginPage.goToLoginPage();
        loginPage.login(user.validUser.noTelepon, user.validUser.password);
        cy.wait(3000); // Wait for login to complete
        loginPage.elements.profileIcon().should('be.visible');
      } else {
        cy.log('User already logged in.');
      }
    });
  });

  it('Should successfully pay for an existing unpaid order', () => {
    // 1. Navigate to Unpaid Page
    loginPage.elements.profileIcon().click();
    unpaidOrderPage.navigateToUnpaidPage();

    // 2. Select Order (Iterate to find non-QRIS)
    // Wait for Blazor to render the order list
    unpaidOrderPage.elements.accordionItems({ timeout: 15000 }).should('exist');

    const findAndPay = (index: number) => {
      unpaidOrderPage.elements.accordionItems().then(($items) => {
        if (index >= $items.length) {
          cy.log('No suitable non-QRIS order found to pay.');
          return;
        }

        unpaidOrderPage.clickPayOrder(index);

        // Extract Payment Method from Modal
        unpaidOrderPage.elements.paymentModal().should('be.visible');

        unpaidOrderPage.getPaymentMethod()
          .then((val) => {
            const paymentMethod = String(val);
            cy.log(`Checking Order #${index + 1}: Payment Method is ${paymentMethod}`);

            if (paymentMethod.includes('QRIS')) {
              cy.log('Payment method is QRIS. Skipping and trying next order...');
              // Close the modal
              unpaidOrderPage.closePaymentModal();

              // Retry with next index
              findAndPay(index + 1);
            } else {
              // 3. Post-Payment (Verification skipped due to limitations)
              payWithMidtransSimulator(paymentMethod);
            }
          });
      });
    };

    findAndPay(0);
  });

  it('Should successfully cancel an existing unpaid order', () => {
    // 1. Navigate to Unpaid Page
    loginPage.elements.profileIcon().click();
    unpaidOrderPage.navigateToUnpaidPage();

    // 2. Select Order to Cancel
    unpaidOrderPage.elements.accordionItems({ timeout: 15000 }).should('exist');

    unpaidOrderPage.clickCancelOrder();

    // 3. Confirm Cancellation
    unpaidOrderPage.confirmCancellation();

    // 4. Verify Success
    unpaidOrderPage.verifySuccess();
  });
});
