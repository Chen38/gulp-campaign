const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const pump = require('pump');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const config = require('./config');

gulp.task('sass', () => {
	pump([
		gulp.src('src/sass/*.scss'),
		$.plumber(),
		$.compass(config.compass),
		gulp.dest('build/css'),
		browserSync.stream()
	]);
});

gulp.task('refresh', () => {
	browserSync.init({
		/**
		 * you should change your own ip address,
		 * like ip + port
		 */
		'proxy': 'http://127.0.0.1:3838/',
		'notify': false,
		'port': 5386
	});
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['cmd']);
	gulp.watch('index.html').on('change', reload);
});

gulp.task('cmd', () => {
	pump([
		browserify({
			entries: 'src/js/app.js',
			debug: true
		}).bundle(),
		source('bundle.js'),
		gulp.dest('build/js'),
		browserSync.stream()
	]);
});

/* ------------------------------------------------ */

gulp.task('uglify', () => {
	pump([
		gulp.src('build/js/bundle.js'),
		$.uglify(),
		gulp.dest('build/js')
	]);
});

// sprite generate
gulp.task('generateSprite', () => {
	let spriteData = gulp.src('sprite/src/*')
		.pipe($.spritesmith(config.spritesmith));
	return spriteData
		.pipe(gulp.dest('sprite'));
});
gulp.task('sprite', ['generateSprite'], () => {
	pump([
		gulp.src('sprite/_sprite.scss'),
		gulp.dest('src/sass'),
		gulp.src('sprite/sprite.png'),
		gulp.dest('build/css')
	]);
});

// dev
gulp.task('dev', ['sass', 'cmd', 'refresh']);

// build
gulp.task('build', ['uglify']);