class UnpaidOrderPage {
  elements = {
    accordionItems: (options?: any) => cy.get('.accordion-item', options),
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

  navigateToUnpaidPage() {
    this.elements.unpaidMenuOption().should('be.visible').click();
    cy.url().should('include', '/cart-page/belum-bayar');
  }

  clickPayOrder(index: number) {
    this.elements.accordionItems().eq(index).within(() => {
      this.elements.payButton().click();
    });
  }

  clickCancelOrder(index: number = 0) {
    this.elements.accordionItems().eq(index).within(() => {
      this.elements.cancelButton().click();
    });
  }

  getPaymentMethod() {
    return this.elements.paymentMethodInput().invoke('val');
  }

  closePaymentModal() {
    this.elements.modalCloseButton().click();
    this.elements.paymentModal().should('not.be.visible');
  }

  confirmCancellation() {
    this.elements.cancelConfirmModal().click();
  }

  verifySuccess() {
    this.elements.successCloseButton().click();
  }
}

export default new UnpaidOrderPage();