@e2e
Feature: Login Functionality

  Scenario: Successful login with valid credentials
    Given I visit the login page
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be logged in successfully
    And I take a screenshot of the inventory page

