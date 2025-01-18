import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  addMatchImageSnapshotPlugin(on, config);
  require('cypress-mochawesome-reporter/plugin')(on);

  return config;
}

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents,
    env: {
      tags: '@e2e'
    },
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Visual Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
      screenshotsFolder: 'cypress/screenshots',
      videosFolder: 'cypress/videos'
    }
  }
}); 