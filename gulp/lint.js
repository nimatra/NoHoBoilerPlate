const gulp = require('gulp');
const tslint = require('gulp-tslint');
const eslint = require('gulp-eslint');

const paths = {
  pages: ['../src/*.html'],
  jsSrcs: ['../src/**/*.js', './gulp/**/*.js', '../*.js'],
  tsSrcs: ['../src/**/*.ts'],
};

gulp.task('eslint', () => gulp.src(paths.jsSrcs)
    .pipe(eslint())
    .pipe(eslint.format()));

gulp.task('tslint', () => gulp.src(paths.tsSrcs)
    .pipe(tslint({
      formatter: 'verbose',
    }))
    .pipe(tslint.report()));
