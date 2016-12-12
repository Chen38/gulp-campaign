const gulp = require('gulp');
const plugins = require('gulp-load-plugins')(); // load all gulp- plugins
const pump = require('pump'); // pipe streams
const amdOptimize = require("amd-optimize"); // AMD pack
const browserSync = require('browser-sync').create(); // auto refresh browser
const reload = browserSync.reload;
// define config
const config = require('./config');

// move bower components
gulp.task('moveBowerComponents', () => {
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

// compile sass
gulp.task('sass', () => {
	// return watch('sass/*.scss', () => {
	gulp.src('sass/*.scss')
		.pipe(plugins.plumber({
			errorHandler: (err) => {
				// console.log(err.message);
			}
		}))
		.pipe(plugins.compass(config.compass))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
	// })
});

// watch *.scss
// gulp.watch("sass/*.scss", ['sass']);

// auto refresh browser
gulp.task('refresh', ['sass'], () => {
	browserSync.init({
		/**
		 * you should change your own ip address,
		 * like ip + port
		 */
		'proxy': "http://10.146.67.187:8038/",
		'notify': false
	});
	gulp.watch("sass/*.scss", ['sass']);
	gulp.watch('test.html').on('change', reload);
	gulp.watch('js/*.js').on('change', reload);
});

// requirejs concat
gulp.task('amd', () => {
	gulp.src('js/*.js')
		.pipe(plugins.plumber({
			errorHandler: err => {
				console.log(err.message);
			}
		}))
		.pipe(amdOptimize('main', config.requirejs))
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({
			'suffix': '.min'
		}))
		.pipe(gulp.dest('dist/js'));
});

// dev
gulp.task('dev', ['moveBowerComponents', 'refresh']);

// sprite
gulp.task('generateSprite', () => {
	let spriteData = gulp.src('sprite/src/*')
		.pipe(plugins.spritesmith(config.spritesmith));
	return spriteData
		.pipe(gulp.dest('sprite'));
});

// move sprite file
gulp.task('sprite', ['generateSprite'], () => {
	pump([
		gulp.src('sprite/_sprite.scss'),
		gulp.dest('sass'),
		gulp.src('sprite/sprite.png'),
		gulp.dest('css')
	]);
});

// build
gulp.task('build', ['amd'], () => {
	pump([
		gulp.src('test.html'),
		plugins.htmlmin(config.htmlmin),
		plugins.rename({
			basename: 'index'
		}),
		// replace(/(\.\.\/)/g, ''),
		gulp.dest('./'),
		plugins.replace(/(js\/main)/, config.build.js.dist),
		gulp.dest('./')
	]);
});