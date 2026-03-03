import loginPage from '../support/pages/LoginPage';

describe('Skenario Login Arimbi.co.id', () => {
  let user: any;

  before(() => {
    cy.fixture('users').then((data) => {
      user = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
    loginPage.goToLoginPage();
  });

  it('Harus berhasil login', () => {
    loginPage.login(user.validUser.noTelepon, user.validUser.password);
    cy.wait(5000);
    loginPage.elements.notificationBadge().should('be.visible');
  });

  it('Harus gagal jika password salah', () => {
    loginPage.login(user.validUser.noTelepon, user.invalidUser.password, false);
    cy.wait(5000);
    loginPage.elements.errorMessage().should('be.visible');
  });

  it('Harus gagal jika No Telepon tidak terdaftar', () => {
    loginPage.login(user.invalidUser.noTelepon, user.validUser.password, false);
    cy.wait(5000);
    loginPage.elements.submitBtn().click();
    loginPage.elements.errorMessage().should('be.visible');
  });

  it('Harus diarahkan ke status logout jika sesi kedaluwarsa', () => {
    // 1. Initial Login
    loginPage.login(user.validUser.noTelepon, user.validUser.password);
    cy.wait(5000);
    
    // 2. Success Confirmation
    loginPage.elements.notificationBadge().should('be.visible');

    // 3. Simulate Session Expiry
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    // 4. Trigger Session Check
    cy.reload();

    // 5. Final Assertions
    loginPage.elements.loginPageBtn().should('be.visible');
    loginPage.elements.notificationBadge().should('not.exist');
  });
});