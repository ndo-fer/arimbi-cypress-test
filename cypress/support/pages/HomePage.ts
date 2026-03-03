// cypress/support/pages/HomePage.ts

class HomePage {
  elements = {
    // Navbar Links
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

    // 1. TRIGGER: Tombol kaca pembesar di Navbar
    searchTrigger: () => cy.get('.navbar-cart .wishlist').first(),

    // 2. INPUT: Kolom ketik di dalam Sidebar (Offcanvas)
    searchInput: () => cy.get('#offcanvasRight input[type="text"], #offcanvasRight input[type="search"]'),

    // 3. PRODUCT CARDS (Gabungan Homepage & Search Page)
    // .card & .product-item = Homepage
    // .single-product = Search Result Page (PENTING!)
    productCards: (options?: any) => cy.get('.card, .product-item, .single-product', options),
    searchResults: () => cy.get('.single-product:visible'), // Khusus untuk hasil pencarian, pastikan hanya yang muncul yang dicek
    // 4. PRODUCT TITLES
    // .card-title = Homepage
    // .title, h4 = Search Result Page
    productTitles: () => cy.get('.card-title, h5, .product-name, .title, h4'),

    // 5. EMPTY STATE
    emptyState: () => cy.get('.empty-state, .text-center, img[alt*="kosong"], h3:contains("tidak ditemukan")'),

    // 6. FILTERS (on Search Page)
    filterWidget: () => cy.get('.widget, .product-sidebar'),
    filterSize: () => cy.contains('.widget-title, h5', 'Ukuran').parent().find('input[type="checkbox"], .form-check-label').first(),
    filterColor: () => cy.contains('.widget-title, h5', 'Warna').parent().find('input[type="checkbox"], .form-check-label').first(),
  };

  visit() {
    cy.visit('https://arimbi.co.id/');
    cy.wait(5000);
  }

  selectBrandFromFashionWanita(brandName: string) {
    this.elements.megaMenuFashionWanita().trigger('mouseover');
    this.elements.megaMenuItem(brandName).should('be.visible').click();
  }

  selectBrandFromFashionAnak(brandName: string) {
    this.elements.navFashionAnak().trigger('mouseover');
    this.elements.megaMenuItem(brandName).should('be.visible').click();
  }

  search(keyword: string) {
    this.elements.searchTrigger().should('be.visible').click();
    
    // Tunggu sidebar animasi selesai & input visible
    this.elements.searchInput()
      .should('be.visible')
      .clear()
      .type(`${keyword}{enter}`);
  }
}

export default new HomePage();