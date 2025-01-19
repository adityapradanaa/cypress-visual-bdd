import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/InventoryPage";

Given("I am on the login page", () => {
  cy.visit("/");
});

When("I login with valid credentials", () => {
  LoginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
});

When("I enter valid credentials", () => {
  LoginPage.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
});

When("I click the login button", () => {
  cy.get('#login-button').click();
});

Then("I should see the inventory page", () => {
  InventoryPage.verifyPageLoaded();
});

Then("I should be redirected to the inventory page", () => {
  InventoryPage.verifyPageLoaded();
});

Then("I take a screenshot of the inventory page", () => {
  InventoryPage.takeInventoryScreenshot();
});

Then("I compare the inventory page screenshot with threshold {float}", (threshold: number) => {
  cy.compareScreenshots('inventory-page', threshold);
});

Then("I should see an error message", () => {
  LoginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user in this service");
});

Then("I should see a locked out error message", () => {
  LoginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out.");
});

Then("I take a screenshot of the error state", () => {
  cy.wait(1000); // Wait for animations
  cy.screenshot('login-error', {
    capture: 'viewport',
    overwrite: true
  });
});

Then("I take a screenshot of the locked out error", () => {
  cy.wait(1000); // Wait for animations
  cy.screenshot('locked-out-error', {
    capture: 'viewport',
    overwrite: true
  });
});

When("I enter invalid credentials", () => {
  LoginPage.login('invalid_user', 'invalid_password');
});

When("I enter locked out user credentials", () => {
  LoginPage.login('locked_out_user', 'secret_sauce');
});