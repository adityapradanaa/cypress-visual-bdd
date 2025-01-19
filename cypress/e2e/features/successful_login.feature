Feature: Visual Testing
  As a QA Engineer
  I want to ensure the UI remains consistent
  So that users have a consistent experience

  @visual
  Scenario: Visual test of inventory page after login
    Given I am on the login page
    When I login with valid credentials
    Then I should see the inventory page
    And I take a screenshot of the inventory page
    And I compare the inventory page screenshot with threshold 0.1
