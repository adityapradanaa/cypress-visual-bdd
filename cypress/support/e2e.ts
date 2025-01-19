// import '@percy/cypress';
import 'cypress-mochawesome-reporter/register';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Take a screenshot and save it with a given name
       * @param name Name of the screenshot
       */
      takeScreenshot(name: string): Chainable<void>;

      /**
       * Compare base and actual screenshots
       * @param name Name of the screenshot to compare
       * @param threshold Maximum allowed mismatch percentage (default: 0.1)
       */
      compareScreenshots(name: string, threshold?: number): Chainable<void>;
    }
  }
}

// Global before function required by @cypress/snapshot
before(() => {
  if (Cypress.env('updateSnapshots')) {
    cy.task('ensureDir', 'cypress/snapshots');
  }
});

// Custom command for taking screenshots
Cypress.Commands.add('takeScreenshot', (name: string) => {
  cy.get('footer').invoke('css', 'display', 'none');
  cy.get('#inventory_container').should('be.visible').screenshot(name, {
    capture: 'viewport',
    blackout: ['footer']
  });
});

// Custom command for comparing screenshots
Cypress.Commands.add('compareScreenshots', (name: string, threshold = 0.1) => {
  cy.task('compareScreenshots', { name }).then((result: any) => {
    const { misMatchPercentage, isSameDimensions, dimensionDifference, diffPath } = result;
    
    // Log comparison results
    cy.log(`Comparison Results for ${name}:`);
    cy.log(`Mismatch: ${misMatchPercentage}%`);
    cy.log(`Same Dimensions: ${isSameDimensions}`);
    if (!isSameDimensions) {
      cy.log(`Dimension Difference:`, dimensionDifference);
    }
    cy.log(`Diff Image: ${diffPath}`);

    // Assert the difference is within threshold
    expect(parseFloat(misMatchPercentage)).to.be.lessThan(
      threshold,
      `Visual difference ${misMatchPercentage}% is above threshold ${threshold}%`
    );
  });
});

// Load environment variables from cypress.env.json if it exists
Cypress.env('USERNAME', Cypress.env('USERNAME') || 'standard_user');
Cypress.env('PASSWORD', Cypress.env('PASSWORD') || 'secret_sauce');