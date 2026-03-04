class ProductPage {
    // --- ELEMENTS ---
    elements = {
        productCard: () => cy.get('.card-product, .product-item, .card, .product-image').first(),
        productName: () => cy.get('h4.title a').first(),
        addToCartHoverBtn: () => cy.contains('button', 'Tambahkan'),
        productDetailName: () => cy.get('h1.product-title, .product_title, h2.title').first(),
        productDetailPrice: () => cy.get('.price, .product-price, .product-price-new').first(),
        productDetailDescription: () => cy.get('.description, #description, .product-description').first(),
        sizeVariantOption: (size: string) => cy.contains('.size-box, .variant-item', size),
        colorVariantOption: () => cy.get('.color-variant, .variant-color').first(),
        activeVariant: () => cy.get('.size-box.active, .variant-item.selected, .color-variant.active'),
        addToCartDetailBtn: () => cy.get('.wish-button').first(),
        cartDrawer: () => cy.get('.offcanvas-end.show, .cart-drawer.open').filter(':visible').first(),
        cartItems: () => cy.get('.cart-item, .basket-item'),
        cartItemTitle: () => cy.get('.cart-item-title, .product-name'),
        checkoutBtn: () => cy.contains('button', 'Bayar Sekarang'),
    };

    // --- ACTIONS ---
    scrollToProduct() {
        Cypress.log({
            displayName: 'PRODUCT',
            message: 'Scrolling to the first product card',
        });
        this.elements.productCard().scrollIntoView({ duration: 1000 });
    }

    openProductPreview() {
        Cypress.log({
            displayName: 'PRODUCT',
            message: 'Opening product preview via hover button',
        });
        this.elements.addToCartHoverBtn().first().click({ force: true, log: false });
    }

    addToCartFromDetail() {
        Cypress.log({
            displayName: 'CART',
            message: 'Adding product to cart from detail page',
        });
        this.elements.addToCartDetailBtn()
            .should('be.visible')
            .click({ log: false });
    }

    navigateToProductDetail() {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: 'Navigating to product detail page',
        });
        this.elements.productName().click({ force: true, log: false });
    }

    scrollToCheckoutButton() {
        Cypress.log({
            displayName: 'CART',
            message: 'Scrolling to checkout button in cart drawer',
        });
        this.elements.cartDrawer().scrollTo('bottom');
    }

    proceedToCheckout() {
        Cypress.log({
            displayName: 'CHECKOUT',
            message: 'Proceeding to checkout from cart drawer',
        });
        this.elements.checkoutBtn().should('be.visible').click({ log: false });
    }
}

export default new ProductPage;
