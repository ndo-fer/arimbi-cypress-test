class CheckoutPage {
  elements = {
    // Note: Selectors for shipping and payment might need adjustment based on the actual UI
    shippingMethodOption: () => cy.get('.shipping-item').first(),
    paymentMethodOption: () => cy.get('.payment-item').first(),
    placeOrderBtn: () => cy.contains('button', 'Selesaikan Pesanan'),
    confirmPaymentBtn: () => cy.contains('button', 'Buat Pembayaran'),
    finishLaterBtn: () => cy.contains('button', 'Selesaikan Nanti'),
    refreshStatusBtn: () => cy.contains('button', 'Refresh Status'),
  };

  selectShippingMethod(name?: string) {
    cy.get('.shipping-item', { timeout: 10000 }).should('be.visible');
    if (name) {
      cy.contains('.shipping-item', name).scrollIntoView().should('be.visible').click({ force: true });
    } else {
      this.elements.shippingMethodOption().should('be.visible').click({ force: true });
    }
  }

  selectPaymentMethod(name?: string) {
    if (name) {
      cy.contains('.payment-item', name).scrollIntoView().should('be.visible').click({ force: true });
    } else {
      this.elements.paymentMethodOption().should('be.visible').click({ force: true });
    }
  }

  placeOrder() {
    this.elements.placeOrderBtn().should('be.visible').click();
  }

  confirmPayment() {
    cy.get('.modal.show').filter(':visible').scrollTo('bottom', { ensureScrollable: false });
    this.elements.confirmPaymentBtn().scrollIntoView().should('be.visible').click();
  }
}

export default new CheckoutPage();