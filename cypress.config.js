const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;


module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    CYPRESS_API_BASE_URL: process.env.CYPRESS_API_BASE_URL,
    CYPRESS_PROJECT_URL: process.env.CYPRESS_PROJECT_URL,
    CYPRESS_HOME_URL: process.env.CYPRESS_HOME_URL,
  },
  e2e: {
   projectId: 'yjko4u',
    // projectId: 'kd7719',

    setupNodeEvents(on, config) {
      on('task', {
        getLatestFile() {
          const downloadsFolder = 'cypress/downloads';

          const files = fs.readdirSync(downloadsFolder);
          const sortedFiles = files
            .map((fileName) => ({
              name: fileName,
              time: fs.statSync(path.join(downloadsFolder, fileName)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time);
          return sortedFiles.length ? path.join(downloadsFolder, sortedFiles[0].name) : null;
        },
      });

      return config;
    },
    baseUrl: 'https://www.google.com/',
    viewportHeight: 660,
    viewportWidth: 1000,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
