/// <reference types="cypress" />
import homePage from '../support/pages/HomePage';

describe('Search Feature Functionality', () => {
  beforeEach(() => {
    homePage.visit();
  });

it('Specific Keyword Search (Happy Path)', () => {
    const keyword = 'Sam'; // Keyword pendek
    homePage.search(keyword);
    cy.wait(2000); // Tunggu tambahan untuk memastikan halaman benar-benar siap

    // 1. Tunggu URL (Wajib)
    cy.url().should('include', '/search-page');
    cy.wait(2000); // Tunggu tambahan untuk memastikan halaman benar-benar siap

    // 2. Tunggu elemen SPESIFIK search page muncul
    // Ganti homePage.elements.productCards() jadi ini:
    homePage.elements.searchResults() 
      .should('have.length.greaterThan', 0) // Pastikan ada hasil
      .first() // Ambil yang pertama
      .find('.title, h4') // Cari judul di dalamnya
      .invoke('text')
      .then((text: string) => {
        cy.log(`Produk Ditemukan: ${text}`);
        // "Adidas Adventure" ga bakal masuk sini karena dia bukan .single-product
        expect(text.toLowerCase()).to.contain(keyword.toLowerCase());
      });
  });

  it('Broad Keyword Search (Sampling)', () => {
    const keyword = 'Nike';
    homePage.search(keyword);

    // 1. Tunggu URL pindah
    cy.url().should('include', '/search-page');

    // ✅ GANTI DI SINI: Gunakan searchResults()
    homePage.elements.searchResults()
      .should('have.length.greaterThan', 1);

    // ✅ GANTI DI SINI JUGA
    homePage.elements.searchResults().each(($el: JQuery<HTMLElement>, index: number) => {
      if (index < 3) {
        cy.wrap($el)
          .find('.title, h4') // Pakai selector judul yang spesifik
          .invoke('text')
          .then((text: string) => {
            expect(text.toLowerCase()).to.contain(keyword.toLowerCase());
          });
      }
    });
  });

  it('Negative Search (Empty State)', () => {
    const keyword = 'XJXKZXKZ'; // Keyword ngawur
    homePage.search(keyword);

    cy.url().should('include', '/search-page');

    homePage.elements.searchResults().should('not.exist');

    cy.contains('Produk tidak ditemukan').should('be.visible');
  });

  // it('Should filter search results by size', () => {
  //   const keyword = 'Run';
  //   homePage.search(keyword);

  //   // 1. Wait for search results page
  //   cy.url().should('include', '/search-page');
  //   homePage.elements.searchResults().should('have.length.greaterThan', 0);

  //   // 2. Apply a filter
  //   homePage.elements.filterWidget().should('be.visible');
  //   homePage.elements.filterSize().click({ force: true });

  //   // 3. Wait for filter to apply and assert
  //   cy.wait(3000); // Wait for page to re-render with filter
  //   cy.url().should('include', 'size='); // Check if URL contains filter param

  //   homePage.elements.searchResults().should('have.length.greaterThan', 0); // Check that there are still results
  // });
});