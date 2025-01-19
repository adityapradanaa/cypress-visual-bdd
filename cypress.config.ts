import { defineConfig } from "cypress";
import * as fs from 'fs';
import * as path from 'path';
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { compare } from 'resemblejs';

const setupNodeEvents = async (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
) => {
  await addCucumberPreprocessorPlugin(on, config);

  // Configure screenshot behavior
  on('after:screenshot', (details) => {
    // If it's a test failure screenshot, move to failures directory
    if (details.path.includes('(failed)')) {
      const newPath = path.join(
        path.dirname(path.dirname(details.path)),
        'failures',
        path.basename(details.path)
      );
      
      // Ensure the directory exists
      fs.mkdirSync(path.dirname(newPath), { recursive: true });
      
      // Move the screenshot to the new path
      fs.renameSync(details.path, newPath);
      
      return { path: newPath };
    }

    // For visual testing screenshots, move to actual folder
    const newPath = path.join(
      path.dirname(details.path),
      'actual',
      path.basename(details.path)
    );
    
    // Ensure the directory exists
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
    
    // Move the screenshot to the new path
    fs.renameSync(details.path, newPath);
    
    return { path: newPath };
  });

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Configure reporter
  on('before:run', async (details) => {
    console.log('override before:run');
    await require('cypress-mochawesome-reporter/plugin')(on, config);
  });

  // Add tasks for directory management and image comparison
  on('task', {
    ensureDir(dirPath) {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created directory: ${dirPath}`);
      }
      return null;
    },
    
    async compareScreenshots({ name }) {
      return new Promise((resolve, reject) => {
        const basePath = path.join(process.cwd(), 'cypress', 'screenshots', 'successful_login.feature', 'base', `${name}.png`);
        const actualPath = path.join(process.cwd(), 'cypress', 'screenshots', 'successful_login.feature', 'actual', `${name}.png`);
        const diffPath = path.join(process.cwd(), 'cypress', 'screenshots', 'successful_login.feature', 'diff', `${name}.png`);

        console.log('Checking paths:');
        console.log('Base:', basePath, fs.existsSync(basePath));
        console.log('Actual:', actualPath, fs.existsSync(actualPath));

        // Ensure both images exist
        if (!fs.existsSync(basePath)) {
          return reject(new Error(`Base image does not exist at: ${basePath}`));
        }
        if (!fs.existsSync(actualPath)) {
          return reject(new Error(`Actual image does not exist at: ${actualPath}`));
        }

        // Ensure diff directory exists
        fs.mkdirSync(path.dirname(diffPath), { recursive: true });

        // Compare images
        compare(
          fs.readFileSync(basePath),
          fs.readFileSync(actualPath),
          {
            output: {
              errorColor: {
                red: 255,
                green: 0,
                blue: 0
              },
              errorType: 'movement',
              transparency: 0.3,
              largeImageThreshold: 1200,
              useCrossOrigin: false,
              outputDiff: true
            }
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            // Save diff image if there are differences
            if (data.misMatchPercentage > 0) {
              fs.writeFileSync(diffPath, data.getBuffer());
            }

            // Return comparison data
            resolve({
              misMatchPercentage: data.misMatchPercentage,
              isSameDimensions: data.isSameDimensions,
              dimensionDifference: data.dimensionDifference,
              diffPath: data.misMatchPercentage > 0 ? diffPath : null
            });
          }
        );
      });
    }
  });

  return config;
};

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'https://www.saucedemo.com',
    pageLoadTimeout: 120000,
    setupNodeEvents,
    env: {
      tags: '@visual',
      failSilently: false,
      video: false,
      screenshotOnRunFailure: true
    },
    screenshotsFolder: 'cypress/screenshots',
    trashAssetsBeforeRuns: false,
    videosFolder: 'cypress/videos',
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
      reportFilename: 'visual-test-report',
      timestamp: true
    }
  }
}); 