var gulp = require('gulp');
var merge = require('merge-stream');
var replace = require('gulp-replace');
var config = require('../config');

gulp.task('themes', function () {
	var tasks = config.themeSheet.map(function(theme) {
		return gulp.src(config.src.scssGlobal)
		.pipe(replace(': false', theme.dark))
		.pipe(replace('teal', theme.color))
		.pipe(gulp.dest(config.temp.themes + theme.path + '/' + theme.color + '/dependencies'));
	});
	return merge(tasks);
});
