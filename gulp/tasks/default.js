var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('default', ['browserSyncTask'], function () {
  	gulp.watch(config.src.js, ['scripts', browserSync.reload]);
  	gulp.watch(config.src.scss, ['styles', browserSync.reload]);
  	gulp.watch(config.src.svg, ['images', browserSync.reload]);
  	gulp.watch(config.dist.html, ['bsReload', browserSync.reload]);
});
