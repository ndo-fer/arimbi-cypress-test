class LoginPage {
    // --- ELEMENTS ---
    elements = {
        loginPageBtn: () => cy.get('[data-bs-target="#exampleModalLogin"], [data-target="#exampleModalLogin"]'),
        noTeleponInput: () => cy.get('#exampleModalLogin input').filter(':visible').first(),
        passwordInput: () => cy.get('#exampleModalLogin input[type="password"]').filter(':visible').first(),
        submitBtn: () => cy.get('#exampleModalLogin button').filter(':visible').contains(/Masuk|login/i),
        profileIcon: () => cy.get('i.lni-user-4, i.lni-user').filter(':visible'),
        notificationBadge: () => cy.get('.total-items'),
        errorMessage: () => cy.get('.alert, .error-message, .invalid-feedback, .me-auto, .text-danger').filter(':visible'),
    };

    // --- ACTIONS ---
    visit() {
        Cypress.log({
            displayName: 'NAVIGATION',
            message: `Navigating to the home page`,
        });
        cy.visit('/');
    }

    goToLoginPage() {
        Cypress.log({
            displayName: 'AUTH',
            message: `Opening the login modal`,
        });
        this.elements.loginPageBtn().filter(':visible').first().click({ log: false });
    }

    login(noTelepon: string, password: string) {
        Cypress.log({
            displayName: 'AUTH',
            message: `Attempting to log in with user: ${noTelepon}`,
        });

        cy.get('#exampleModalLogin').should('be.visible');

        if (noTelepon) {
            this.elements.noTeleponInput()
                .should('be.visible')
                .should('be.enabled')
                .clear({ log: false })
                .click({ log: false })
                .type(noTelepon, { log: false });
        }

        if (password) {
            this.elements.passwordInput()
                .should('be.visible')
                .should('be.enabled')
                .clear({ log: false })
                .click({ log: false })
                .type(password, { log: false });
        }

        this.elements.submitBtn().should('be.visible').click({ log: false });
    }
}

export default new LoginPage();
