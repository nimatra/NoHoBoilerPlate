const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const gutil = require('gulp-util');
const tslint = require('gulp-tslint');
const eslint = require('gulp-eslint');
const connect = require('gulp-connect');
const staticFiles = require('./staticFiles');
const tests = require('./tests');
const clean = require('./clean');

const paths = {
  pages: ['../src/*.html'],
  jsSrcs: ['./**/*.js'],
  tsSrcs: ['../src/**/*.ts'],
};

gulp.task('delete-dev', (done) => {
  clean.run(done, './dev');
});

gulp.task('eslint', () => gulp.src(paths.jsSrcs)
    .pipe(eslint())
    .pipe(eslint.format()));

gulp.task('tslint', () => gulp.src(paths.tsSrcs)
    .pipe(tslint({
      formatter: 'verbose',
    }))
    .pipe(tslint.report()));

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
    presets: ['es2015'],
    extensions: ['.ts'],
  })
  .bundle()
  .pipe(source('index.js'))
  .pipe(buffer());

function dev() {
  staticFiles.watch();
  const result = watchedBrowserify
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dev'))
        .pipe(connect.reload());
  watchedBrowserify.on('update', dev);
  watchedBrowserify.on('log', gutil.log);
  return result;
}
// todo: add delete path
gulp.task('dev', () => {
  runSequence(['eslint', 'tslint', 'connect-dev']);
  return dev();
});