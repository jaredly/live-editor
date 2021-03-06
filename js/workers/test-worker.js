// Mock out $._, since we don't use any of the sprintf functionality
var $ = {};
$._ = function(str) { return str;};

// We set window to self so that StructuredJS can find Esprima and
// Underscore
if (typeof window === "undefined") { 
    /*global window:true */
    window = self;  
}

var init = false;
var date = (new Date()).toDateString();

self.onmessage = function(event) {
    if (!init) {
        init = true;

        importScripts(event.data.externalsDir +
            "es5-shim/es5-shim.js?cachebust=" + date);
        importScripts(event.data.externalsDir +
            "structuredjs/external/esprima.js?cachebust=" + date);
        importScripts(event.data.externalsDir +
            "underscore/underscore.js?cachebust=" + date);
        importScripts(event.data.externalsDir +
            "structuredjs/structured.js?cachebust=" + date);
        importScripts("./output-tester.js?cachebust=" + date);
    }

    OutputTester.test(event.data.code, event.data.validate, event.data.errors);

    // Return the OutputTester results to the main code
    self.postMessage({
         type: "test",
         message: {
            testResults: OutputTester.testResults,
            errors: OutputTester.errors
        }
    });
};