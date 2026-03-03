import loginPage from '../support/pages/LoginPage';
import homePage from '../support/pages/HomePage';

describe('Skenario Navigasi Navbar Arimbi.co.id', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    // Conditional login check
    cy.get('body').then(($body) => {
      if ($body.find('.total-items').length === 0) {
        cy.log('User not logged in. Proceeding to login.');
        loginPage.goToLoginPage();
        loginPage.login(user.validUser.noTelepon, user.validUser.password);
        cy.wait(5000);
        loginPage.elements.notificationBadge().should('be.visible');
      } else {
        cy.log('User already logged in. Skipping login step.');
      }
    });
  });

  it('Harus bisa navigasi ke halaman Promo', () => {
    homePage.elements.navPromo().click();
    cy.url().should('include', 'promo');
    homePage.elements.promoBanner().should('be.visible');
  });

  it('Harus bisa navigasi ke halaman Promo Spesial', () => {
    homePage.elements.promoSpesialLink().click();
    homePage.elements.pageHeader().should('contain.text', 'Promo Spesial');
  });

  it('Harus bisa navigasi ke halaman Promo 12.12', () => {
    homePage.elements.promo1212Link().click();
    homePage.elements.pageHeader().should('contain.text', 'Promo 12.12');
  });

  it('Harus berhasil memilih brand Nike dari Mega Menu Fashion Wanita', () => {
    homePage.selectBrandFromFashionWanita('Nike');
    cy.url().should('include', 'nike');
    homePage.elements.categoryTitle().should('be.visible');
    homePage.elements.productCards().should('have.length.greaterThan', 0);
  });

  it('Harus bisa navigasi ke halaman Fashion Wanita', () => {
    homePage.elements.navFashionWanita().click();
    cy.url().should('include', 'fashion-wanita');
    homePage.elements.categoryTitle().should('be.visible');
    homePage.elements.productCards().should('have.length.greaterThan', 0);
  });

  it('Harus bisa navigasi ke halaman Fashion Pria', () => {
    homePage.elements.navFashionPria().click();
    cy.url().should('include', 'fashion-pria');
    homePage.elements.categoryTitle().should('be.visible');
    homePage.elements.productCards().should('have.length.greaterThan', 0);
  });

  it('Harus bisa navigasi ke halaman Fashion Anak', () => {
    homePage.elements.megaMenuContainer().should('be.visible');
    homePage.elements.megaMenuItem('Nike').click();
    cy.url().should('include', 'nike');
    homePage.elements.categoryTitle().should('be.visible');
    homePage.elements.productCards().should('have.length.greaterThan', 0);
  });
});