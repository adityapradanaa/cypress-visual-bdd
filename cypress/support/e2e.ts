import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import 'cypress-mochawesome-reporter/register';

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(name?: string): Chainable<Element>
    }
  }
}

// Configure image snapshot
addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'viewport',
});

// Load environment variables from cypress.env.json if it exists
Cypress.env('USERNAME', Cypress.env('USERNAME') || 'standard_user');
Cypress.env('PASSWORD', Cypress.env('PASSWORD') || 'secret_sauce'); 