var gulp = require('gulp');
var config = require('../config');

gulp.task('default', ['browserSyncTask'], function () {
	gulp.watch(config.src.js, 'scripts');
	gulp.watch(config.src.scss, 'styles');
	gulp.watch(config.src.svg, 'images');
	gulp.watch(config.dist.html, 'bsReload');
});
