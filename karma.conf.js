module.exports = (config) => {
  config.set({

    basePath: '',

    files: [
      'dev/js/**/*.spec.js',
    ],

    exclude: [
    ],

    frameworks: ['browserify', 'jasmine'],

    browserify: {
      debug: false,
      transform: ['babelify'],
    },

    preprocessors: {
      'dev/js/**/*.js': ['browserify'],
    },

    babelPreprocessor: {
      options: {
        presets: ['es5', 'react'],
        sourceMap: 'inline',
      },
      filename(file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName(file) {
        return file.originalPath;
      },
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true,
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // How long does Karma wait for a browser to reconnect (in ms).
    browserNoActivityTimeout: 100000,
  });
};
