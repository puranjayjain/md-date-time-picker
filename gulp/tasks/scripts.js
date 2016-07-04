var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('scripts', function () {
	return gulp.src(config.src.js)
	.pipe(babel())
	.pipe(gulp.dest(config.dist.js))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(uglify())
	.pipe(gulp.dest(config.dist.js))
	.pipe(browserSync.reload({
		stream: true
	}));
});
