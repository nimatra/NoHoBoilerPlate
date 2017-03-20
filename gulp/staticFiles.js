const gulp = require('gulp');
const cache = require('gulp-cached');

const originals = [
  { description: 'INDEX', src: './src/index.html', dest: '' },
];
let targets = {};

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
function setDest(path) {
  targets = originals.map(target => Object.assign({}, target, { dest: path }));
}
function build(done) {
  setDest('./build');
  copy({ shouldWatch: false });
  done();
}
function dev(done) {
  setDest('./dev');
  copy({ shouldWatch: true });
  done();
}

gulp.task('static-build', done => build(done));

gulp.task('static-dev', done => dev(done));
