const gulp = require('gulp');
const plumber = require('gulp-plumber'); // prevent error interrupt task
const concat = require('gulp-concat'); // merge scripts
const uglify = require('gulp-uglify'); // minify scripts
const pump = require('pump'); // pipe streams
const rename = require('gulp-rename'); // rename file
const amdOptimize = require("amd-optimize"); // AMD pack
const replace = require('gulp-replace'); // build replace path
const spritesmith = require('gulp.spritesmith'); // sprite convert
const htmlmin = require('gulp-htmlmin'); // minify html
const compass = require('gulp-compass'); // compile sass to css
const browserSync = require('browser-sync').create(); // auto refresh browser
const reload = browserSync.reload;
const config = require('./config');

// move bower components
gulp.task('moveBowerComponents', () => {
	gulp.src(config.dev.bower.requirejs)
		.pipe(uglify())
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.zepto)
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.fastclick)
		.pipe(gulp.dest(config.dev.dest.js));

	gulp.src(config.dev.bower.normalize)
		.pipe(gulp.dest(config.dev.dest.css));
});

// concat and uglify js
// gulp.task('uglifyLib', () => {
// 	pump([
// 		gulp.src('vendor/js/*.js'),
// 		concat('fx.min.js'),
// 		uglify(),
// 		gulp.dest('dist/js')
// 	]);
// });

// gulp.task('uglifyApp', () => {
// 	pump([
// 		gulp.src('scripts/*'),
// 		concat('app.min.js'),
// 		uglify(),
// 		gulp.dest('dist/js')
// 	]);
// });

// compile sass
gulp.task('sass', () => {
	// return watch('sass/*.scss', () => {
	gulp.src('sass/*.scss')
		.pipe(plumber({
			errorHandler: (err) => {
				// console.log(err.message);
			}
		}))
		.pipe(compass(config.compass))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
	// })
});

// watch *.scss
// gulp.watch("sass/*.scss", ['sass']);

// auto refresh browser
gulp.task('refresh', ['sass'], () => {
	browserSync.init({
		// you can change your own Apache server ip address
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
		.pipe(plumber({
			errorHandler: err => {
				console.log(err.message);
			}
		}))
		.pipe(amdOptimize('main', config.requirejs))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(rename({
			'suffix': '.min'
		}))
		.pipe(gulp.dest('dist/js'));
});

// dev
gulp.task('dev', ['moveBowerComponents', 'refresh']);

// sprite
gulp.task('generateSprite', () => {
	let spriteData = gulp.src('sprite/src/*')
		.pipe(spritesmith(config.spritesmith));
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

// tiny
// gulp.task('tiny', () => {
// 	imagemin(['img/*', 'img/**/*'], 'dist/img', {
// 		plugins: [
// 			imageminMozjpeg({
// 				progressive: true
// 			}),
// 			imageminPngquant()
// 		]
// 	});
// });

// build
gulp.task('build', ['amd'], () => {
	pump([
		gulp.src('test.html'),
		htmlmin(config.htmlmin),
		rename({
			basename: 'index'
		}),
		// replace(/(\.\.\/)/g, ''),
		gulp.dest('./'),
		replace(/(js\/main)/, config.build.js.dist),
		gulp.dest('./')
	]);
});