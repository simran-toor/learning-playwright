export class LoginPage {
    constructor(page) {
        this.page = page; 
        this.usernameInputField = page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="acct"]');
        this.passwordInputField = page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[name="pw"]');
        this.loginButton = page.locator('form').filter({ hasText: 'username:password: login' }).locator('input[type="submit"]');
        this.logoutButton = page.getByRole('link', { name: 'logout' });
        this.loginSuccessUsername = page.getByRole('link', { name: 'st-test' });
    }
    //visibility methods
    async isUsernameInputFieldVisible() {
        const usernameInputField = this.usernameInputField;
        return await usernameInputField.isVisible();
    }

    async isPasswordInputFieldVisible() {
        const passwordInputField = this.passwordInputField;
        return await passwordInputField.isVisible();
    }

    async isLoginButtonVisible() {
        const loginButton = this.loginButton;
        return await loginButton.isVisible();
    }

    // login methods
    async fillUsername(username) {
        const usernameInputField = this.usernameInputField;
        await usernameInputField.fill(username);
    }

    async fillPassword(password) {
        const passwordInputField = this.passwordInputField;
        await passwordInputField.fill(password);
    }

    async logIn(username, password) {
        await this.fillUsername(username);
        await this.fillPassword(password);
    }

    async clickLoginButton() {
        const loginButton = this.loginButton;
        await loginButton.click();
    }

    
    
    // login success username visibility method
    async isloginSuccessUsernameVisible() {
        const loginSuccessUsername = this.loginSuccessUsername;
        return await loginSuccessUsername.isVisible();
    }

    // logout button visibility method
    async isLogoutButtonVisible() {
        const logoutButton = this.logoutButton;
        return await logoutButton.isVisible();
    }
}

