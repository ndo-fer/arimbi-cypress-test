class ProductSideDrawer {
  elements = {
    sideDrawer: () => cy.get('.offcanvas.offcanvas-end.show, .modal.show, .drawer-open, .offcanvas-body').filter(':visible').first(),
    sideDrawerContent: () => cy.get('.offcanvas-body').filter(':visible').first(),
    productNameInDrawer: () => cy.get('h5, h4, .product-title').filter(':visible'),
    sizeOptionsContainer: () => cy.get('.size-options, .sizes-list'),
    sizeOptionLabel: (size: string) => cy.contains('.size-box'),
    sizeOptions: () => cy.get('.active'),
    addToCartBtn: () => cy.get('.wish-button').first(),
    buyNowBtn: () => cy.contains('button', 'Beli Sekarang'),
  };

  addToCart() {
    this.elements.sideDrawerContent().scrollTo('bottom');
    this.elements.addToCartBtn().should('be.visible').click();
  }

  buyNow() {
    this.elements.sideDrawerContent().scrollTo('bottom');
    this.elements.buyNowBtn().should('be.visible').click();
  }
}

export default new ProductSideDrawer();