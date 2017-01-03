const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const pump = require('pump');
const amdOptimize = require("amd-optimize");
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const config = require('./config');

gulp.task('move', () => {
	gulp.src(config.dev.bower.requirejs)
		.pipe(plugins.uglify())
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.zepto)
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.fastclick)
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.normalize)
		.pipe(gulp.dest(config.dev.dest.css));
});

gulp.task('sass', () => {
	pump([
		gulp.src('sass/*.scss'),
		plugins.plumber(),
		plugins.compass(config.compass),
		gulp.dest('css'),
		browserSync.stream()
	]);
});

gulp.task('refresh', () => {
	browserSync.init({
		/**
		 * you should change your own ip address,
		 * like ip + port
		 */
		'proxy': "http://10.146.67.187:8038/",
		'notify': false,
		'port': 5386
	});
	gulp.watch("sass/*.scss", ['sass']);
	gulp.watch('test.html').on('change', reload);
	gulp.watch('js/*.js').on('change', reload);
});

gulp.task('amd', () => {
	pump([
		gulp.src('js/*.js'),
		plugins.plumber({
			errorHandler: err => {
				console.log(err.message);
			}
		}),
		amdOptimize('main', config.requirejs),
		plugins.concat('app.js'),
		plugins.uglify(),
		plugins.rename({
			'suffix': '.min'
		}),
		gulp.dest('dist/js')
	]);
});

gulp.task('htmlmin', () => {
	pump([
		gulp.src('test.html'),
		plugins.htmlmin(config.htmlmin),
		plugins.rename({
			basename: 'index'
		}),
		gulp.dest('./'),
		plugins.replace(/(js\/main)/, config.build.js.dist),
		gulp.dest('./')
	]);
});

/* ------------------------------------------------ */

// sprite generate
gulp.task('generateSprite', () => {
	let spriteData = gulp.src('sprite/src/*')
		.pipe(plugins.spritesmith(config.spritesmith));
	return spriteData
		.pipe(gulp.dest('sprite'));
});
gulp.task('sprite', ['generateSprite'], () => {
	pump([
		gulp.src('sprite/_sprite.scss'),
		gulp.dest('sass'),
		gulp.src('sprite/sprite.png'),
		gulp.dest('css')
	]);
});

// dev
gulp.task('dev', ['sass', 'refresh']);

// build
gulp.task('build', ['amd', 'htmlmin']);