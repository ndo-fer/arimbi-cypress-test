import productPage from '../support/pages/ProductPage';
import productSideDrawer from '../support/pages/ProductSideDrawer';
import checkoutPage from '../support/pages/CheckoutPage';
import { payWithMidtransSimulator } from '../support/utils/PaymentUtils';

describe('Checkout Flow', () => {
    beforeEach(() => {
        // Log in using the custom command, which leverages cy.session for speed.
        cy.login();
        
        // After the session is restored, visit the page to start the flow.
        cy.visit('/');

        // Setup: Add a product to the cart to enable checkout.
        productPage.scrollToProduct();
        productPage.openProductPreview();
        productSideDrawer.elements.sideDrawer().should('be.visible');
        productSideDrawer.buyNow();
    });

    const scenarios = [
        { shipping: 'JNE Express (Regular)', payment: 'BNI (VA)' },
        { shipping: 'KURIR EXPRESS', payment: 'BCA (VA)' },
        { shipping: 'Si Cepat (Express 25)', payment: 'Mandiri (VA)' },
        { shipping: 'Gojek Express 25', payment: 'BRI (VA)' },
        { shipping: 'GOJEK', payment: 'Indomaret' },
        { shipping: 'JNT Express', payment: 'Alfamart Counter' },
    ];

    scenarios.forEach(({ shipping, payment }) => {
        it(`should complete checkout with ${shipping} and ${payment}`, () => {
            checkoutPage.selectShippingMethod(shipping);
            checkoutPage.selectPaymentMethod(payment);
            checkoutPage.placeOrder();
            checkoutPage.confirmPayment();

            cy.get('.modal.show', { timeout: 15000 })
                .filter(':visible')
                .first()
                .as('paymentModal')
                .scrollTo('bottom', { ensureScrollable: false });

            if (payment === 'QRIS') {
                cy.get('@paymentModal').find('img').should('have.attr', 'src').and('match', /midtrans|qr/i);
                checkoutPage.elements.finishLaterBtn().scrollIntoView().should('be.visible');
                checkoutPage.elements.refreshStatusBtn().scrollIntoView().should('be.visible');
            } else {
                // The payWithMidtransSimulator function should contain its own waits/assertions
                payWithMidtransSimulator(payment);
            }
        });
    });
});
