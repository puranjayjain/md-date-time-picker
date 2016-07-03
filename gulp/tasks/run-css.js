var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('run-css', function() {
  return runSequence(['scss', 'build-css']);
});
