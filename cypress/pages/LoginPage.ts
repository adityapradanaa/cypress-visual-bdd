class LoginPage {
    // Elements
    private usernameInput = '[data-test="username"]';
    private passwordInput = '[data-test="password"]';
    private loginButton = '[data-test="login-button"]';
    private errorMessage = '[data-test="error"]';

    // Actions
    visit() {
        cy.visit('/');
    }

    typeUsername(username: string) {
        cy.get(this.usernameInput).type(username);
    }

    typePassword(password: string) {
        cy.get(this.passwordInput).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    // Assertions
    verifyErrorMessage(message: string) {
        cy.get(this.errorMessage)
            .should('be.visible')
            .and('contain', message);
    }

    takeErrorScreenshot() {
        cy.wait(1000); // delay for 1 second
        cy.matchImageSnapshot('login-error');
    }

    // Combined Actions
    login(username: string, password: string) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

export default new LoginPage(); 