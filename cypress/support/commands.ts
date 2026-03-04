/// <reference types="./index.d.ts" />

import loginPage from './pages/LoginPage';

/**
 * Custom command to handle user login and session caching.
 * This command will perform a UI login only once and then restore
 * the session for subsequent tests, significantly improving performance.
 */
Cypress.Commands.add('login', () => {
    cy.session('currentUser', () => {
        cy.fixture('users.json').then((users) => {
            cy.visit('/');
            loginPage.goToLoginPage();
            loginPage.login(users.validUser.noTelepon, users.validUser.password);
            loginPage.elements.notificationBadge().should('be.visible');
        });
    }, {
        cacheAcrossSpecs: true
    });
});
