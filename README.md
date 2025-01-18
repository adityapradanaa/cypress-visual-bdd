# Cypress Visual BDD Testing Framework

This project demonstrates an end-to-end testing framework using Cypress with BDD (Behavior Driven Development), Visual Testing, and comprehensive test reporting capabilities.

## Features

- **BDD Testing** with Cucumber integration
- **Visual Regression Testing** using cypress-image-snapshot
- **Page Object Model** implementation
- **Mochawesome Reporting** with detailed test execution reports
- **TypeScript** support for better code maintainability

## Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cypress-visual-bdd
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
cypress/
├── e2e/
│   ├── features/          # Gherkin feature files
│   └── step_definitions/  # Step definitions
├── pages/                 # Page Object Model files
├── reports/              # Test reports
├── screenshots/          # Test failure screenshots
├── snapshots/           # Visual testing snapshots
└── videos/              # Test execution videos
```

## Running Tests

### Opening Cypress Test Runner
```bash
npm run cypress:open
```

### Running Tests Headlessly
```bash
npm run cypress:e2e
```

### Generating Test Reports
```bash
npm run report:full
```

## Visual Testing

This project uses `cypress-image-snapshot` for visual regression testing. The framework captures screenshots of the application and compares them with baseline images to detect visual changes.

### Managing Visual Tests

1. **Creating Baseline Images**
```bash
npx cypress run --env tags=@e2e,updateSnapshots=true
```

2. **Running Visual Comparison Tests**
```bash
npm run cypress:e2e
```

3. **Handling Visual Changes**
- Failed visual tests will generate diff images in `cypress/snapshots/__diff_output__/`
- Review the differences and update baselines if changes are intended

## BDD Implementation

The project uses Cucumber for BDD implementation:

1. **Feature Files** (`cypress/e2e/features/`)
   - Written in Gherkin syntax
   - Describe test scenarios in plain English

2. **Step Definitions** (`cypress/e2e/step_definitions/`)
   - Implement the steps defined in feature files
   - Written in TypeScript

Example Feature:
```gherkin
Feature: Login Functionality
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in successfully
```

## Page Object Model

The framework implements the Page Object Model pattern for better maintainability:

- `LoginPage.ts`: Handles login page interactions
- `InventoryPage.ts`: Manages inventory page elements and actions

## Test Reporting

The project uses Cypress Mochawesome Reporter for detailed test reporting.

### Viewing Reports

1. Run tests with reporting:
```bash
npm run report:full
```

2. Access the report:
- Open `cypress/reports/output.html` in a web browser
- Reports include:
  - Test execution summary
  - Test steps and status
  - Screenshots and videos
  - Execution time and statistics

### Available Scripts

- `cypress:open`: Open Cypress Test Runner
- `cypress:e2e`: Run tests headlessly
- `cypress:e2e:open`: Open Cypress Test Runner with E2E testing
- `cypress:report`: Run tests with reporting
- `report:merge`: Merge JSON reports
- `report:generate`: Generate HTML report
- `report:full`: Complete test execution and report generation

## Configuration Files

- `cypress.config.ts`: Main Cypress configuration
- `package.json`: Project dependencies and scripts
- `.gherkin-lintrc`: Gherkin linting rules
- `tsconfig.json`: TypeScript configuration

## Best Practices

1. **Visual Testing**
   - Keep baseline images in version control
   - Review visual differences carefully
   - Update baselines when intended changes occur

2. **BDD**
   - Write clear, concise feature files
   - Maintain step definitions organized
   - Use descriptive step names

3. **Page Objects**
   - Keep selectors centralized
   - Implement reusable methods
   - Follow single responsibility principle

## Troubleshooting

1. **Visual Test Failures**
   - Check `cypress/snapshots/__diff_output__/` for visual differences
   - Update baselines if changes are intended
   - Verify test environment consistency

2. **Report Generation Issues**
   - Ensure proper directory structure
   - Check for JSON report generation
   - Verify merge and generate commands

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC 