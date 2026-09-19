const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Node events for NLP metrics reporting can be initialized here
    },
  },
});
