class QuietReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunStart() {
  }

  onTestFileStart() {
    // Suppress test file start output
  }

  onTestSuiteStart() {
    // Suppress test suite start output
  }

  onTestStart() {
    // Suppress individual test start output
  }

  onTestResult() {
    // Suppress individual test result output
  }

  onRunComplete(contexts, results) {
    const { numFailedTests, numPassedTests, numTotalTests, testResults } = results;
    const numFailedTestSuites = testResults.filter(t => t.numFailingTests > 0).length;
    const numPassedTestSuites = testResults.filter(t => t.numFailingTests === 0).length;
    const numTotalTestSuites = testResults.length;
    
    if (numFailedTests > 0) {
      // Show details only when tests fail
      testResults.forEach(testResult => {
        if (testResult.numFailingTests > 0) {
          console.log(`FAIL ${testResult.testFilePath}`);
          testResult.testResults.forEach(test => {
            if (test.status === 'failed') {
              console.log(`  ✕ ${test.title}`);
              if (test.failureMessages && test.failureMessages.length > 0) {
                test.failureMessages.forEach(message => {
                  console.log(`    ${message}`);
                });
              }
            }
          });
        }
      });
    }
    
    if (numFailedTests === 0) {
      console.log(`✅ All ${numTotalTests} tests passed!`);
    } else {
      console.log(`❌ ${numFailedTests} failed, ${numPassedTests} passed (${numTotalTests} total)`);
    }
  }
}

module.exports = QuietReporter;