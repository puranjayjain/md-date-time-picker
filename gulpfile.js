'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
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
var replace = require('gulp-replace');
var merge = require('merge-stream');
var del = require('del');

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
	js: 'dist/js/Globals',
	umd: 'dist/js/Umd'
};

var themeSheet = [{
	color: 'red',
	dark: ': false',
	path: 'light'
}, {
	color: 'pink',
	dark: ': false',
	path: 'light'
}, {
	color: 'purple',
	dark: ': false',
	path: 'light'
}, {
	color: 'deep-purple',
	dark: ': false',
	path: 'light'
}, {
	color: 'indigo',
	dark: ': false',
	path: 'light'
}, {
	color: 'blue',
	dark: ': false',
	path: 'light'
}, {
	color: 'light-blue',
	dark: ': false',
	path: 'light'
}, {
	color: 'cyan',
	dark: ': false',
	path: 'light'
}, {
	color: 'green',
	dark: ': false',
	path: 'light'
}, {
	color: 'light-green',
	dark: ': false',
	path: 'light'
}, {
	color: 'lime',
	dark: ': false',
	path: 'light'
}, {
	color: 'yellow',
	dark: ': false',
	path: 'light'
}, {
	color: 'amber',
	dark: ': false',
	path: 'light'
}, {
	color: 'orange',
	dark: ': false',
	path: 'light'
}, {
	color: 'deep-orange',
	dark: ': false',
	path: 'light'
}, {
	color: 'brown',
	dark: ': false',
	path: 'light'
}, {
	color: 'grey',
	dark: ': false',
	path: 'light'
}, {
	color: 'blue-grey',
	dark: ': false',
	path: 'light'
}, {
	color: 'teal',
	dark: ': false',
	path: 'light'
},
{
	color: 'red',
	dark: ': true',
	path: 'dark'
}, {
	color: 'pink',
	dark: ': true',
	path: 'dark'
}, {
	color: 'purple',
	dark: ': true',
	path: 'dark'
}, {
	color: 'deep-purple',
	dark: ': true',
	path: 'dark'
}, {
	color: 'indigo',
	dark: ': true',
	path: 'dark'
}, {
	color: 'blue',
	dark: ': true',
	path: 'dark'
}, {
	color: 'light-blue',
	dark: ': true',
	path: 'dark'
}, {
	color: 'cyan',
	dark: ': true',
	path: 'dark'
}, {
	color: 'green',
	dark: ': true',
	path: 'dark'
}, {
	color: 'light-green',
	dark: ': true',
	path: 'dark'
}, {
	color: 'lime',
	dark: ': true',
	path: 'dark'
}, {
	color: 'yellow',
	dark: ': true',
	path: 'dark'
}, {
	color: 'amber',
	dark: ': true',
	path: 'dark'
}, {
	color: 'orange',
	dark: ': true',
	path: 'dark'
}, {
	color: 'deep-orange',
	dark: ': true',
	path: 'dark'
}, {
	color: 'brown',
	dark: ': true',
	path: 'dark'
}, {
	color: 'grey',
	dark: ': true',
	path: 'dark'
}, {
	color: 'blue-grey',
	dark: ': true',
	path: 'dark'
}, {
	color: 'teal',
	dark: ': true',
	path: 'dark'
}];

gulp.task('browser-sync', function () {
	return browserSync({
		server: {
			baseDir: "./dist"
		}
	});
});

gulp.task('bs-reload', function () {
	return	browserSync.reload();
});

gulp.task('images', function () {
	return gulp.src(src.images)
	.pipe(cache(imagemin({
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	})))
	.pipe(gulp.dest(dist.images));
});

gulp.task('styles', function () {
	return gulp.src([src.scss])
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
	.pipe(rename('mdDateTimePicker.css'))
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

gulp.task('scriptsUMD', function () {
	return gulp.src(src.js)
	.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest(dist.umd))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(uglify())
	.pipe(gulp.dest(dist.umd));
});

gulp.task('init-themes', function () {
	var tasks = themeSheet.map(function(theme) {
		return gulp.src('src/scss/**/*')
		.pipe(gulp.dest('temp/scss/themes/' + theme.path + '/' + theme.color));
	});
	return merge(tasks);
});

gulp.task('themes', function () {
	var tasks = themeSheet.map(function(theme) {
		return gulp.src('src/scss/dependencies/_global.scss')
		.pipe(replace(': false',theme.dark))
		.pipe(replace('teal', theme.color))
		.pipe(gulp.dest('temp/scss/themes/' + theme.path + '/' + theme.color + '/dependencies'));
	});
	return merge(tasks);
});

gulp.task('generate-stylesheets', function () {
	var tasks = themeSheet.map(function(theme) {
		return gulp.src(['temp/scss/themes/' + theme.path + '/' + theme.color + '/**/*.scss'])
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
		.pipe(rename('mdDateTimePicker.css'))
		.pipe(gulp.dest('dist/css/themes/' + theme.path + '/' + theme.color + '/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css/themes/' + theme.path + '/' + theme.color + '/'));
	});
	return merge(tasks);
});

gulp.task('clean-dir', function () {
	return del('temp/**/*');
});

gulp.task('generate-themes', gulp.series('init-themes','themes', 'generate-stylesheets', 'clean-dir', function (done) {
	// just an empty placeholder to run the tasks
	done();
}));

gulp.task('default', gulp.series('browser-sync', function () {
	gulp.watch(src.js, 'scripts');
	gulp.watch(src.scss, 'styles');
	gulp.watch(src.svg, 'images');
	gulp.watch(dist.html, 'bs-reload');
}));
