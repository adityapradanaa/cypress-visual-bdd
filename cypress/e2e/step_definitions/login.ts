import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/InventoryPage";

Given("I visit the login page", () => {
    LoginPage.visit();
});

When("I enter {string} as username", (username: string) => {
    LoginPage.typeUsername(username);
});

When("I enter {string} as password", (password: string) => {
    LoginPage.typePassword(password);
});

When("I click the login button", () => {
    LoginPage.clickLogin();
});

Then("I should be logged in successfully", () => {
    InventoryPage.verifyPageLoaded();
});

Then("I take a screenshot of the inventory page", () => {
    InventoryPage.takeInventoryScreenshot();
});

Then("I should see an error message", () => {
    LoginPage.verifyErrorMessage('Username and password do not match');
});

Then("I should see a locked out error message", () => {
    LoginPage.verifyErrorMessage('Sorry, this user has been locked out');
});

Then("I take a screenshot of the error state", () => {
    LoginPage.takeErrorScreenshot();
});

Then("I take a screenshot of the locked out error", () => {
    LoginPage.takeErrorScreenshot();
});