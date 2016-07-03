var gulp = require('gulp');

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('src/**/*.scss', ['run-css']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['images','imagesRoot']);
  gulp.watch('src/templates/**/*', ['nunjucks']);
  gulp.watch('src/*.html', ['bs-reload']);
});
