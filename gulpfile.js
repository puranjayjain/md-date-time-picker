var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

//process sass
gulp.task('sass', function ()
{
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'));
});
//copy fonts into relevant directories
gulp.task('copyFonts', function ()
{
	return gulp.src([
			'src/fonts/*.eot',
			'src/fonts/*.svg',
			'src/fonts/*.ttf',
			'src/fonts/*.woff'
		])
		.pipe(gulp.dest('dist/fonts'));
});
gulp.task('copyROOT', function ()
{
	return gulp.src([
			'src/*.php',
			'src/*.png'
		])
		.pipe(gulp.dest('dist'));
});
// minify css to dist
gulp.task('minifyCss', function ()
{
	return gulp.src('src/css/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist/css'));
});
// minify js to dist
gulp.task('minifyJs', function ()
{
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
//run them when saved watch for changes
gulp.task('watch', function ()
{
	gulp.watch('src/sass/*.scss', ['sass', 'copyFonts', 'copyImg']);
});
// copy folders that are relevant
var folders = ['dbconnect', 'emoji', 'fetchscripts', 'helper', 'imagescripts', 'mailer', 'postscripts', 'script', 'security', 'templates', 'tracker', 'vendor', 'verification'];
// copy folders to dist recursively
gulp.task('copyFolders', function ()
{
	return folders.forEach(function (folder)
	{
		return gulp.src(['src/' + folder + '/**/*'])
			.pipe(gulp.dest('dist/' + folder));
	});
});
// generate distributable folder
gulp.task('distributable', function ()
{
	gulp.watch('src/*.php', ['copyFolders','minifyCss','minifyJs','copyROOT']);
});
