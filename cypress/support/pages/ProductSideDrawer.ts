class ProductSideDrawer {
    // --- ELEMENTS ---
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

    // --- ACTIONS ---
    addToCart() {
        Cypress.log({
            displayName: 'CART',
            message: 'Adding product to cart from side drawer',
        });
        this.elements.sideDrawerContent().scrollTo('bottom');
        this.elements.addToCartBtn().should('be.visible').click({ log: false });
    }

    buyNow() {
        Cypress.log({
            displayName: 'CHECKOUT',
            message: 'Clicking "Buy Now" from side drawer',
        });
        this.elements.sideDrawerContent().scrollTo('bottom');
        this.elements.buyNowBtn().should('be.visible').click({ log: false });
    }
}

export default new ProductSideDrawer();
