var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('cleanDir', function () {
	return del(config.src.temp);
});
