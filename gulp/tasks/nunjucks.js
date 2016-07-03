var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('nunjucks', function() {
  return gulp.src('src/templates/pages/*.njk')
  .pipe(nunjucksRender({
    path: ['src/templates/'] // String or Array
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
