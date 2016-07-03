var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('bs-reload', function() {
  return browserSync.reload();
});
