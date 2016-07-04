var gulp = require('gulp');
var del = require('del');
var config = require('../config').src;

gulp.task('cleanDir', function () {
	return del(config.temp);
});
