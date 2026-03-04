import homePage from '../support/pages/HomePage';

describe('Navbar Navigation', () => {
    beforeEach(() => {
        // Ensure user is logged in and at the home page before each test.
        cy.login();
        cy.visit('/');
    });

    it('should navigate to the Promo page', () => {
        homePage.elements.navPromo().click();
        cy.url().should('include', 'promo');
        homePage.elements.promoBanner().should('be.visible');
    });

    it('should navigate to the Special Promo page', () => {
        homePage.elements.promoSpesialLink().click();
        homePage.elements.pageHeader().should('contain.text', 'Promo Spesial');
    });

    it('should navigate to the Promo 12.12 page', () => {
        homePage.elements.promo1212Link().click();
        homePage.elements.pageHeader().should('contain.text', 'Promo 12.12');
    });

    it("should navigate to a brand page from the Women's Fashion mega menu", () => {
        homePage.selectBrandFromFashionWanita('Nike');
        cy.url().should('include', 'nike');
        homePage.elements.categoryTitle().should('be.visible');
        homePage.elements.productCards().should('have.length.greaterThan', 0);
    });

    it("should navigate to the Women's Fashion category page", () => {
        homePage.elements.navFashionWanita().click();
        cy.url().should('include', 'fashion-wanita');
        homePage.elements.categoryTitle().should('be.visible');
        homePage.elements.productCards().should('have.length.greaterThan', 0);
    });

    it("should navigate to the Men's Fashion category page", () => {
        homePage.elements.navFashionPria().click();
        cy.url().should('include', 'fashion-pria');
        homePage.elements.categoryTitle().should('be.visible');
        homePage.elements.productCards().should('have.length.greaterThan', 0);
    });

    it("should navigate to a brand page from the Kid's Fashion mega menu", () => {
        homePage.selectBrandFromFashionAnak('Nike');
        cy.url().should('include', 'nike');
        homePage.elements.categoryTitle().should('be.visible');
        homePage.elements.productCards().should('have.length.greaterThan', 0);
    });
});
