var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');

gulp.task('images', function() {
  gulp.src('src/images/*')
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

gulp.task('scripts', function() {
  return gulp.src(['src/js/material.min.js', 'src/js/moment.min.js', 'src/js/md-date-time-picker.min.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// anything below this line is freshly baked
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

//process sass
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'ie >= 6']
    }))
    .pipe(gulp.dest('src/css'))
});

// concat files
gulp.task('build-css', function() {
  return gulp.src(['src/css/material.min.css', 'src/css/component.css', 'src/css/main.css'])
    .pipe(concatCss('bundle.css'))
    // .pipe(cssnano())
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//run css tasks
gulp.task('run-css', function() {
  runSequence(['scss', 'build-css']);
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('src/scss/*.scss', ['run-css']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['images']);
  gulp.watch('src/*.html', ['bs-reload']);
});
