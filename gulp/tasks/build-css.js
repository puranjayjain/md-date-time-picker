var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var concatCss = require('gulp-concat-css');
var config = require('../config');

gulp.task('build-css', function() {
  return gulp.src(config.src.css)
  .pipe(concatCss('bundle.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
