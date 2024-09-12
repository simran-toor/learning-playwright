const { test, expect } = require('playwright/test');
import { LoginPage } from '../Pages/login-page.js';

test.beforeEach(async ({ page }) => {
    await page.goto('https://news.ycombinator.com/login?goto=news');
});

test.describe('check elements visibility', () => {
    test('verify username input field is visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const usernameInputFieldIsVisible = await loginPage.isUsernameInputFieldVisible();

        expect(usernameInputFieldIsVisible).toBe(true);
    });

    test('verify password input field is visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const passwordInputFieldIsVisible = await loginPage.isPasswordInputFieldVisible();

        expect(passwordInputFieldIsVisible).toBe(true);
    });

    test('verify login button is visible', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginButtonIsVisible = await loginPage.isLoginButtonVisible();

        expect(loginButtonIsVisible).toBe(true);
    });
});

test.describe('test login functionality', async () => {
// if login successful page should redirect back to front page
const successfullyLoggedInURL = "https://news.ycombinator.com/news";

    test('test login functionality with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.logIn(process.env.HN_USERNAME, process.env.HN_PASSWORD);
        await loginPage.clickLoginButton();

        
        await expect(page).toHaveURL(successfullyLoggedInURL);

        const loginSuccessUsernameIsVisible = await loginPage.isloginSuccessUsernameVisible();
        expect(loginSuccessUsernameIsVisible).toBe(true);

        const logoutButtonIsVisible = await loginPage.isLogoutButtonVisible();
        expect(logoutButtonIsVisible).toBe(true);
    })
})