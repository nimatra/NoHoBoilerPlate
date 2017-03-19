const del = require('del');
const gutil = require('gulp-util');
const fs = require('fs');

function run(done, path) {
  fs.stat(path, (err) => {
    if (err) {
      // Never existed
      done();
    } else {
      del([path], { force: true })
        .then((paths) => {
          gutil.log('Deleted files/folders:\n', paths.join('\n'));
          done();
        })
        .catch((error) => {
          gutil.log('Problem deleting:\n', error);
          done();
        });
    }
  });
}

module.exports = {
  run(done, path) { return run(done, path); },
};
