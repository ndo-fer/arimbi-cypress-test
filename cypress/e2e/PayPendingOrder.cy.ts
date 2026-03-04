import loginPage from '../support/pages/LoginPage';
import unpaidOrderPage from '../support/pages/UnpaidOrderPage';
import { payWithMidtransSimulator } from '../support/utils/PaymentUtils';

describe('Pending Order Management', () => {
    beforeEach(() => {
        // Log in and navigate to the unpaid orders page before each test.
        cy.login();
        cy.visit('/');
        
        loginPage.elements.profileIcon().click();
        unpaidOrderPage.navigateToUnpaidPage();
        unpaidOrderPage.elements.accordionItems({ timeout: 15000 }).should('exist');
    });

    it('should be able to pay for a pending order', () => {
        const findAndPay = (index: number) => {
            unpaidOrderPage.elements.accordionItems().then(($items) => {
                if (index >= $items.length) {
                    // Stop if no suitable (non-QRIS) order is found to pay.
                    return;
                }

                unpaidOrderPage.clickPayOrder(index);
                unpaidOrderPage.elements.paymentModal().should('be.visible');

                unpaidOrderPage.getPaymentMethod().then((val) => {
                    const paymentMethod = String(val);

                    if (paymentMethod.includes('QRIS')) {
                        // This test logic specifically seeks a non-QRIS order to test a different payment path.
                        unpaidOrderPage.closePaymentModal();
                        findAndPay(index + 1); // Retry with the next order
                    } else {
                        payWithMidtransSimulator(paymentMethod);
                    }
                });
            });
        };

        findAndPay(0);
    });

    it('should be able to cancel a pending order', () => {
        // Assuming we try to cancel the first order in the list.
        unpaidOrderPage.clickCancelOrder(0); 
        unpaidOrderPage.confirmCancellation();
        unpaidOrderPage.verifySuccess();
    });
});
