class HomePage {
    // --- ELEMENTS ---
    elements = {
        navPromo: () => cy.contains('a.nav-link', /promo/i),
        navFashionAnak: () => cy.contains('a.a-menu', /fashion anak/i),
        navFashionPria: () => cy.contains('a.nav-link', 'Fashion Pria'),
        navFashionWanita: () => cy.contains('a.nav-link', 'Fashion Wanita'),
        promoBanner: () => cy.get('.promo-banner, .section-promo, [alt*="promo"]').first(),
        promoSpesialLink: () => cy.get('a.a-menu').contains('Promo Spesial'),
        promo1212Link: () => cy.get('a.a-menu').contains('Promo 12.12'),
        pageHeader: () => cy.get('h2'),
        megaMenuFashionWanita: () => cy.get('a.a-menu').contains('Fashion Wanita'),
        megaMenuContainer: () => cy.get('.mega-menu'),
        megaMenuItem: (brandName: string) => cy.contains('button.item-submenu', brandName),
        categoryTitle: () => cy.get('h1.category-title, .page-title, .title-category').first(),
        searchTrigger: () => cy.get('.navbar-cart .wishlist').first(),
        searchInput: () => cy.get('#offcanvasRight input[type="text"], #offcanvasRight input[type="search"]'),
        productCards: (options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) => cy.get('.card, .product-item, .single-product', options),
        searchResults: () => cy.get('.single-product:visible'),
        productTitles: () => cy.get('.card-title, h5, .product-name, .title, h4'),
        emptyState: () => cy.get('.empty-state, .text-center, img[alt*="kosong"], h3:contains("tidak ditemukan")'),
        filterWidget: () => cy.get('.widget, .product-sidebar'),
        filterSize: () => cy.contains('.widget-title, h5', 'Ukuran').parent().find('input[type="checkbox"], .form-check-label').first(),
        filterColor: () => cy.contains('.widget-title, h5', 'Warna').parent().find('input[type="checkbox"], .form-check-label').first(),
    };

    // --- ACTIONS ---
    visit() {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: 'Navigating to the home page',
        });
        cy.visit('/');
    }

    selectBrandFromFashionWanita(brandName: string) {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: `Selecting brand '${brandName}' from 'Fashion Wanita' category`,
        });
        this.elements.megaMenuFashionWanita().trigger('mouseover', { log: false });
        this.elements.megaMenuItem(brandName).should('be.visible').click({ log: false });
    }

    selectBrandFromFashionAnak(brandName: string) {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: `Selecting brand '${brandName}' from 'Fashion Anak' category`,
        });
        this.elements.navFashionAnak().trigger('mouseover', { log: false });
        this.elements.megaMenuItem(brandName).should('be.visible').click({ log: false });
    }

    search(keyword: string) {
        Cypress.log({
            displayName: 'SEARCH',
            message: `Searching for keyword: '${keyword}'`,
        });
        this.elements.searchTrigger().should('be.visible').click({ log: false });
        this.elements.searchInput()
            .should('be.visible')
            .clear({ log: false })
            .type(`${keyword}{enter}`, { log: false });
    }
}

export default new HomePage();
