class UnpaidOrderPage {
    // --- ELEMENTS ---
    elements = {
        accordionItems: (options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) => cy.get('.accordion-item', options),
        payButton: () => cy.contains('button', 'Bayar Pesanan'),
        cancelButton: () => cy.get('button').filter(':visible').contains('Batalkan'),
        paymentModal: () => cy.get('#staticBackdrop2'),
        paymentMethodInput: () => cy.contains('label', 'Metode Pembayaran').parent().find('input'),
        modalCloseButton: () => cy.get('#staticBackdrop2').find('button.btn-close, button:contains("Tutup"), button:contains("Close")').first(),
        cancelConfirmModal: () => cy.get('button').filter(':visible').contains('Batalkan Pesanan'),
        successMessage: () => cy.contains('berhasil', { timeout: 10000 }).should('be.visible'),
        successCloseButton: () => cy.contains('button', 'Tutup'),
        unpaidMenuOption: () => cy.contains('.dropdown-item-custom', 'Belum Bayar')
    };

    // --- ACTIONS ---
    navigateToUnpaidPage() {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: 'Navigating to the unpaid orders page',
        });
        this.elements.unpaidMenuOption().should('be.visible').click({ log: false });
        cy.url().should('include', '/cart-page/belum-bayar');
    }

    clickPayOrder(index: number) {
        Cypress.log({
            displayName: 'PAYMENT',
            message: `Clicking "Pay Order" for order at index ${index}`,
        });
        this.elements.accordionItems().eq(index).within(() => {
            this.elements.payButton().click({ log: false });
        });
    }

    clickCancelOrder(index: number = 0) {
        Cypress.log({
            displayName: 'ORDER',
            message: `Clicking "Cancel Order" for order at index ${index}`,
        });
        this.elements.accordionItems().eq(index).within(() => {
            this.elements.cancelButton().click({ log: false });
        });
    }

    getPaymentMethod() {
        Cypress.log({
            displayName: 'PAYMENT',
            message: 'Getting payment method from modal',
        });
        return this.elements.paymentMethodInput().invoke('val');
    }

    closePaymentModal() {
        Cypress.log({
            displayName: 'UI',
            message: 'Closing the payment modal',
        });
        this.elements.modalCloseButton().click({ log: false });
        this.elements.paymentModal().should('not.be.visible');
    }

    confirmCancellation() {
        Cypress.log({
            displayName: 'ORDER',
            message: 'Confirming order cancellation',
        });
        this.elements.cancelConfirmModal().click({ log: false });
    }

    verifySuccess() {
        Cypress.log({
            displayName: 'ASSERTION',
            message: 'Verifying success message and closing',
        });
        this.elements.successCloseButton().click({ log: false });
    }
}

export default new UnpaidOrderPage();
