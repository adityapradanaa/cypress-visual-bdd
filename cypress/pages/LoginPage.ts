class LoginPage {
    // Elements
    private usernameInput = '#user-name';
    private passwordInput = '#password';
    private loginButton = '#login-button';
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
            .and('have.text', message);
    }

    verifyLoginButtonExists() {
        cy.get(this.loginButton).should('exist');
    }

    takeErrorScreenshot() {
        cy.wait(1000); // Wait for animations
        cy.screenshot('login-error', {
            capture: 'viewport',
            overwrite: true
        });
    }

    // Combined Actions
    login(username: string, password: string) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

export default new LoginPage(); 