var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('scripts', function() {
  return gulp.src(config.src.js)
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
