const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

requireDir('./gulp', { recurse: true });

const IsProd = process.env.NODE_ENV === 'production';

gulp.task('default', () => {
  if (IsProd) {
    runSequence('build');
  } else {
    runSequence('dev');
  }
});
