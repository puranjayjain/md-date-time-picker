var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

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

var src = {
	scss: 'src/scss/**/*.scss',
	images: 'src/images/**/*',
	js: 'src/js/**/*.js',
	svg: 'src/images/**/*.svg'
};

var dist = {
	css: 'dist/css/',
	html: 'dist/*.html',
	images: 'dist/images/',
	js: 'dist/js/'
};

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('images', function () {
	gulp.src(src.images)
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(dist.images));
});

gulp.task('styles', function () {
	gulp.src([src.scss])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 4 versions', 'ie >= 6']
		}))
		.pipe(gulp.dest(dist.css))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('scripts', function () {
	return gulp.src(src.js)
		.pipe(babel())
		.pipe(gulp.dest(dist.js))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch(src.scss, ['styles']);
	gulp.watch(src.js, ['scripts']);
	gulp.watch(src.svg, ['images']);
	gulp.watch(dist.html, ['bs-reload']);
});
