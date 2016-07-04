var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('generateThemes', function(done) {
	runSequence('initThemes', 'themes', 'generateStylesheets', 'cleanDir', function() {
		done();
	});
});
