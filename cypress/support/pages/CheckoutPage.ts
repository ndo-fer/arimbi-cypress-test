class CheckoutPage {
    // --- ELEMENTS ---
    elements = {
        shippingMethodOption: () => cy.get('.shipping-item').first(),
        paymentMethodOption: () => cy.get('.payment-item').first(),
        placeOrderBtn: () => cy.contains('button', 'Selesaikan Pesanan'),
        confirmPaymentBtn: () => cy.contains('button', 'Buat Pembayaran'),
        finishLaterBtn: () => cy.contains('button', 'Selesaikan Nanti'),
        refreshStatusBtn: () => cy.contains('button', 'Refresh Status'),
    };

    // --- ACTIONS ---
    selectShippingMethod(name?: string) {
        const shippingName = name || 'default';
        Cypress.log({
            displayName: 'CHECKOUT',
            message: `Selecting shipping method: ${shippingName}`,
        });

        cy.get('.shipping-item', { timeout: 10000 }).should('be.visible');

        const selection = name ? cy.contains('.shipping-item', name) : this.elements.shippingMethodOption();
        selection.scrollIntoView({ log: false }).should('be.visible').click({ force: true, log: false });
    }

    selectPaymentMethod(name?: string) {
        const paymentName = name || 'default';
        Cypress.log({
            displayName: 'CHECKOUT',
            message: `Selecting payment method: ${paymentName}`,
        });

        const selection = name ? cy.contains('.payment-item', name) : this.elements.paymentMethodOption();
        selection.scrollIntoView({ log: false }).should('be.visible').click({ force: true, log: false });
    }

    placeOrder() {
        Cypress.log({
            displayName: 'CHECKOUT',
            message: 'Placing the order',
        });
        this.elements.placeOrderBtn().should('be.visible').click({ log: false });
    }

    confirmPayment() {
        Cypress.log({
            displayName: 'CHECKOUT',
            message: 'Confirming the payment',
        });
        cy.get('.modal.show', { log: false }).filter(':visible').scrollTo('bottom', { ensureScrollable: false });
        this.elements.confirmPaymentBtn().scrollIntoView({ log: false }).should('be.visible').click({ log: false });
    }
}

export default new CheckoutPage();
