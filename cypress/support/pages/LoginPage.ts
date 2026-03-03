class LoginPage {
  elements = {
    loginPageBtn: () => cy.get('[data-bs-target="#exampleModalLogin"], [data-target="#exampleModalLogin"]'),
    noTeleponInput: () => cy.get('#exampleModalLogin input').filter(':visible').first(),
    passwordInput: () => cy.get('#exampleModalLogin input[type="password"]').filter(':visible').first(),
    submitBtn: () => cy.get('#exampleModalLogin button').filter(':visible').contains(/Masuk|login/i),
    profileIcon: () => cy.get('i.lni-user-4, i.lni-user').filter(':visible'),
    notificationBadge: () => cy.get('.total-items'),
    errorMessage: () => cy.get('.alert, .error-message, .invalid-feedback, .me-auto, .text-danger').filter(':visible'),
  };

  visit() {
    cy.visit('https://arimbi.co.id/');
  }

  goToLoginPage() {
    this.elements.loginPageBtn().filter(':visible').first().click();
  }

  login(noTelepon: string, password: string, expectSuccess: boolean = true) {
    cy.get('#exampleModalLogin').should('be.visible');

    if (noTelepon) {
      this.elements.noTeleponInput()
        .should('be.visible')
        .should('be.enabled')
        .clear()
        .click()
        .type(noTelepon);
    }

    if (password) {
      this.elements.passwordInput()
        .should('be.visible')
        .should('be.enabled')
        .clear()
        .click()
        .type(password);
    }

    this.elements.submitBtn().should('be.visible').click();

    // if (expectSuccess) {
    //   cy.get('#exampleModalLogin').should('not.be.visible');
    // }
  }
}

export default new LoginPage();