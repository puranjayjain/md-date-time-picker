var gulp = require('gulp');
var config = require('../config');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var merge = require('merge-stream');

gulp.task('generateStylesheets', function () {
	var tasks = config.themeSheet.map(function(theme) {
		return gulp.src([config.temp.themes + theme.path + '/' + theme.color + '/**/*.scss'])
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
		.pipe(gulp.dest(config.dist.themes + theme.path + '/' + theme.color + '/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest(config.dist.themes + theme.path + '/' + theme.color + '/'));
	});
	return merge(tasks);
});
