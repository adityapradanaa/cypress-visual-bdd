# Cypress Visual Testing with BDD

This project demonstrates visual regression testing using Cypress with Behavior-Driven Development (BDD) approach. It combines Cucumber for BDD, Page Object Model for better test organization, and visual testing capabilities.

## Features

- BDD implementation using Cucumber and Gherkin syntax
- Page Object Model (POM) for maintainable test code
- Visual regression testing with screenshot comparison
- Automatic screenshot management for:
  - Base images (expected UI state)
  - Actual images (current UI state)
  - Diff images (when differences are detected)
  - Failed test screenshots (in separate directory)

## Directory Structure

```
cypress/
├── e2e/
│   └── features/            # Feature files in Gherkin syntax
│       └── successful_login.feature
├── fixtures/               # Test data
├── pages/                 # Page Object Model classes
│   └── InventoryPage.ts
├── screenshots/           # Visual testing screenshots
│   ├── base/             # Baseline images
│   ├── actual/           # Current test run images
│   ├── diff/             # Difference images
│   └── failures/         # Failed test screenshots
└── support/              # Support files and commands
    └── e2e.ts           # Custom commands and configurations
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   # Run all tests
   npx cypress run

   # Run specific feature
   npx cypress run --spec "cypress/e2e/features/successful_login.feature"
   ```

## Visual Testing Workflow

1. Create baseline images:
   - Run tests normally
   - If satisfied with the screenshots, copy them from `actual` to `base` folder

2. Run visual comparison:
   - Execute tests normally
   - Screenshots will be taken and compared with baseline
   - Differences will be highlighted in diff images
   - Failed screenshots will be stored separately

## Configuration

The project uses several key configurations:

- `cypress.config.ts`: Main Cypress configuration
- `e2e.ts`: Custom commands and screenshot handling
- `.gitignore`: Excludes unnecessary files from version control

## Best Practices

1. Keep baseline images in version control
2. Review visual differences carefully
3. Update baselines when intended UI changes occur
4. Use meaningful names for screenshots
5. Maintain separate directories for different types of screenshots
