var gulp = require('gulp');
var browserSync = require('browser-sync');

// anything below this line is freshly baked
gulp.task('browser-sync', function() {
  return browserSync({
    server: {
      baseDir: "./"
    }
  });
});
