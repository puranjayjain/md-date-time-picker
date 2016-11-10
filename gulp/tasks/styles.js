var gulp = require('gulp');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('styles', function () {
	return gulp.src([config.src.scss])
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: config.browsers
	}))
	.pipe(rename(config.name.css))
	.pipe(gulp.dest(config.dist.css))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest(config.dist.css))
	.pipe(browserSync.reload({
		stream: true
	}));
});
