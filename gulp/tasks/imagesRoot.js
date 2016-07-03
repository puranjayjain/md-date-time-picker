var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('imagesRoot', function() {
  return gulp.src(config.src.favicons, {base: 'src/'})
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true
  })))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
