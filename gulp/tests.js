const gulp = require('gulp');
const Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', (done) => {
  new Server({
    configFile: `${__dirname}/../karma.conf.js`,
    singleRun: true,
  }, done).start();
});


// const jasmineBrowser = require('gulp-jasmine-browser');

// gulp.task('test', () => gulp.src(['dev/js/**/*.js', 'dev/js/**/*_spec.js'])
//     .pipe(jasmineBrowser.specRunner({ console: true }))
//     .pipe(jasmineBrowser.headless()));
