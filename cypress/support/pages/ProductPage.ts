class ProductPage {
  elements = {
    // Product listing elements
    productCard: () => cy.get('.card-product, .product-item, .card, .product-image').first(),
    productName: () => cy.get('h4.title a').first(),
    addToCartHoverBtn: () => cy.contains('button', 'Tambahkan'),

    // Product Detail Page (PDP) elements
    productDetailName: () => cy.get('h1.product-title, .product_title, h2.title').first(),
    productDetailPrice: () => cy.get('.price, .product-price, .product-price-new').first(),
    productDetailDescription: () => cy.get('.description, #description, .product-description').first(),
    sizeVariantOption: (size: string) => cy.contains('.size-box, .variant-item', size),
    colorVariantOption: () => cy.get('.color-variant, .variant-color').first(),
    activeVariant: () => cy.get('.size-box.active, .variant-item.selected, .color-variant.active'),
    addToCartDetailBtn: () => cy.get('.wish-button').first(),

    // Cart drawer elements
    cartDrawer: () => cy.get('.offcanvas-end.show, .cart-drawer.open').filter(':visible').first(),
    cartItems: () => cy.get('.cart-item, .basket-item'),
    cartItemTitle: () => cy.get('.cart-item-title, .product-name'),
    checkoutBtn: () => cy.contains('button', 'Bayar Sekarang'),
  };

  scrollToProduct() {
    this.elements.productCard().scrollIntoView({ duration: 1000 });
  }

  openProductPreview() {
    this.elements.addToCartHoverBtn().first().click({ force: true });
  }

  addToCartFromDetail() {
    this.elements.addToCartDetailBtn()
      .should('be.visible')
      .click();
  }

  navigateToProductDetail() {
    this.elements.productName().click({ force: true });
  }

  scrollToCheckoutButton() {
    this.elements.cartDrawer().scrollTo('bottom');
  }

  proceedToCheckout() {
    this.elements.checkoutBtn().should('be.visible').click();
  }
}

export default new ProductPage;