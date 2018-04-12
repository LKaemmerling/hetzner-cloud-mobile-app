// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
if (process.env.CI != undefined && ("" + process.env.CI) == "true") {
  var ChromeOptions = {
    args: ['--no-sandbox', '--headless','--user-agent ="E2E-Test"']
  }
} else {
  var ChromeOptions = {
    args: ['--no-sandbox','--user-agent ="E2E-Test"']
  }
}
var config = {
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: ChromeOptions
  },
  directConnect: true,
  baseUrl: 'http://localhost:8001/'

}
console.log( process.env.LANG);
exports.config = Object.assign({
  allScriptsTimeout: 50000,
  specs: [
    '../e2e/**/*.e2e-spec.ts'
  ],
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: (1000 * 60 * 60), // Default Timeout is one hour, because some tests are long-running
    print: function () {
    }
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter());
  },
  params: {
    global: {
      api_key: process.env.TEST_API_KEY,
      screenshots: process.env.SCREENSHOTS,
      lang: process.env.LANG,
    }
  }
}, config);

