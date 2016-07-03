var gulp = require('gulp');
var merge = require('merge-stream');
var config = require('../config');

gulp.task('initThemes', function () {
	var tasks = config.themeSheet.map(function(theme) {
		return gulp.src(config.src.scssGlob)
		.pipe(gulp.dest(config.temp.themes + theme.path + '/' + theme.color));
	});
	return merge(tasks);
});
