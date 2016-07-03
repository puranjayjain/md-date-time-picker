var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config');

gulp.task('scss', function() {
  return gulp.src(config.src.scss)
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: config.browsers
  }))
  .pipe(gulp.dest('src/css'));
});
