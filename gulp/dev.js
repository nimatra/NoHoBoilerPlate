const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
const typescript = require('gulp-tsc');
const requireDir = require('require-dir');

requireDir('./', { recurse: true });

gulp.task('connect-dev', () => {
  connect.server({
    root: './dev',
    port: process.env.PORT || 8080,
    livereload: true,
  });
});

const watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['src/index.ts'],
  cache: {},
  packageCache: {},
}).plugin(tsify))
  .transform('babelify', {
    presets: ['es2015', 'react'],
    extensions: ['.ts'],
  })
  .bundle()
  .pipe(source('index.js'))
  .pipe(buffer());

function dev() {
  // creating non-concatinated js transcompiles for testing
  gulp.src(['src/**/*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('dev/js/'));

  const result = watchedBrowserify
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dev'))
        .pipe(connect.reload());
  watchedBrowserify.on('update', dev);
  watchedBrowserify.on('log', gutil.log);
  return result;
}

gulp.task('dev', (done) => {
  runSequence('clean-dev', ['static-dev', 'eslint', 'tslint'], 'connect-dev', 'test');
  dev();
  done();
});

gulp.task('dev-test', (done) => {
  runSequence('clean-dev', 'static-dev', 'eslint', 'tslint', 'test');
  dev();
  done();
});
