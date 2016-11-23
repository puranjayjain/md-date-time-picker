var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browserSyncTask', function () {
	return browserSync({
		server: {
			baseDir: './dist',
			directory: true
		}
	});
});
