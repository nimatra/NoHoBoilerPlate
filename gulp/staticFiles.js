const gulp = require('gulp');
const cache = require('gulp-cached');

const originals = [
  { description: 'INDEX', src: './src/index.html', dest: '' },
];
let targets = {};

function copy(options) {
  function run(target) {
    console.log(target);
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
function setDest(path) {
  targets = originals.map(target => Object.assign({}, target, { dest: path }));
}
module.exports = {
  build() {
    setDest('./build');
    return copy({ shouldWatch: false });
  },
  watch() {
    setDest('./dev');
    return copy({ shouldWatch: true });
  },
};
