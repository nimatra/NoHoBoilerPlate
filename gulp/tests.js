

// const Server = require('karma').Server;
// const path = require('path');
// const gutil = require('gulp-util');

// function runTests(options) {
//   // Documentation: https://karma-runner.github.io/0.13/dev/public-api.html
//   const karmaConfig = {
//     configFile: path.join(__dirname, '../karma.conf.js'),
//     singleRun: !options.shouldWatch,

//     plugins: ['karma-webpack', 'karma-jasmine', 'karma-mocha-reporter', 'karma-sourcemap-loader', 'karma-phantomjs-launcher'],
//     reporters: ['mocha'],
//   };

//   if (options.done) {
//     karmaConfig.plugins.push('karma-junit-reporter');
//     karmaConfig.reporters.push('junit');
//   } else {
//     karmaConfig.plugins.push('karma-notify-reporter');
//     karmaConfig.reporters.push('notify');
//   }

//   new Server(karmaConfig, karmaCompleted).start();

//   function karmaCompleted(exitCode) {
//     if (options.done) {
//       if (exitCode === 1) {
//         gutil.log(`Karma: tests failed with code ${exitCode}`);
//       } else {
//         gutil.log('Karma completed!');
//       }
//       options.done();
//     } else {
//       process.exit(exitCode);
//     }
//   }
// }

// module.exports = {
//   run(done) { return runTests({ shouldWatch: false, done }); },
//   watch() { return runTests({ shouldWatch: true }); },
// };
