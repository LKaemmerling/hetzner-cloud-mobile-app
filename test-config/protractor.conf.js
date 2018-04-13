// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
if (process.env.CI != undefined && ("" + process.env.CI) == "true") {
  var ChromeOptions = {
    args: ['--no-sandbox', '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36 E2E-Test"', '-lang="' + process.env.LANG + '"', '--headless']
  }
} else {
  var ChromeOptions = {
    args: ['--no-sandbox', '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36 E2E-Test"', '-lang="' + process.env.LANG + '"']
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
console.log(ChromeOptions);
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

