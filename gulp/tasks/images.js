var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('images', function () {
  return gulp.src(config.src.images)
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('images'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
