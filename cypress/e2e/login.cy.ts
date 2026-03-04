import loginPage from '../support/pages/LoginPage';
import { UserFixture } from '../support/types';

describe('Login Scenarios', () => {
    let users: UserFixture;

    before(() => {
        // Load fixture data once before all tests
        cy.fixture('users.json').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        // Navigate to the home page and open the login modal before each test
        cy.visit('/');
        loginPage.goToLoginPage();
    });

    it('should login successfully with valid credentials', () => {
        loginPage.login(users.validUser.noTelepon, users.validUser.password);
        loginPage.elements.notificationBadge().should('be.visible');
    });

    it('should fail to login when using an invalid password', () => {
        loginPage.login(users.userWithInvalidPassword.noTelepon, users.userWithInvalidPassword.password);
        loginPage.elements.errorMessage().should('be.visible');
    });

    it('should fail to login when using an unregistered phone number', () => {
        loginPage.login(users.unregisteredUser.noTelepon, users.unregisteredUser.password);
        loginPage.elements.errorMessage().should('be.visible');
    });

    it('should be in a logged out state after the session expires', () => {
        // 1. Perform a login to establish a session
        loginPage.login(users.validUser.noTelepon, users.validUser.password);
        loginPage.elements.notificationBadge().should('be.visible');

        // 2. Simulate session expiry
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
        
        // 3. Reload the page to trigger session check
        cy.reload();

        // 4. Assert logged out state
        loginPage.elements.loginPageBtn().should('be.visible');
        loginPage.elements.notificationBadge().should('not.exist');
    });
});
