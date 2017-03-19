const gulp = require('gulp');
const cache = require('gulp-cached');

const targets = [
  { description: 'INDEX', src: './src/index.html', dest: '' },
];

function copy(options) {
  function run(target) {
    gulp.src(target.src)
      .pipe(cache(target.description))
      .pipe(gulp.dest(target.dest));
  }

  function watch(target) {
    gulp.watch(target.src, () => { run(target); });
  }

  targets.forEach(run);

  if (options.shouldWatch) {
    targets.forEach(watch);
  }
}

module.exports = {
  build() {
    targets.dest = './build';
    return copy({ shouldWatch: false });
  },
  watch() {
    targets.dest = './dev';
    return copy({ shouldWatch: true });
  },
};
