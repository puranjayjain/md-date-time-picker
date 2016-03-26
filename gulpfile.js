var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

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
		.pipe(rename('md-date-time-picker.css'))
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
