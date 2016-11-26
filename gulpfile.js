var gulp = require('gulp'),
	plumber = require('gulp-plumber'), // prevent error interrupt task
	concat = require('gulp-concat'), // merge scripts
	uglify = require('gulp-uglify'), // minify scripts
	pump = require('pump'), // pipe streams
	rename = require('gulp-rename'), // rename file
	amdOptimize = require("amd-optimize"), // AMD pack
	replace = require('gulp-replace'), // build replace path
	spritesmith = require('gulp.spritesmith'), // sprite convert
	htmlmin = require('gulp-htmlmin'), // minify html
	compass = require('gulp-compass'), // compile sass to css
	browserSync = require('browser-sync').create(); // auto refresh browser

var config = require('./config');

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
	return gulp.src('sass/*.scss')
		.pipe(plumber({
			errorHandler: (err) => {
				// console.log(err.message);
			}
		}))
		.pipe(compass(config.compass))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
	// })
});

// watch *.scss
// gulp.watch("sass/*.scss", ['sass']);

// auto refresh browser
gulp.task('refresh', ['sass'], () => {
	browserSync.init({
		'proxy': "http://192.168.1.105:8038/bitbucket/gulp_campaign/view/",
		'notify': false
	});
	gulp.watch("sass/*.scss", ['sass']);
});

// requirejs concat
gulp.task('amd', () => {
	return gulp.src('js/*.js')
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
gulp.task('sprite', () => {
	var spriteData = gulp.src('asset/src/*')
		.pipe(spritesmith(config.spritesmith));
	return spriteData
		.pipe(gulp.dest('asset'));
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
		gulp.src('view/*.html'),
		htmlmin(config.htmlmin),
		replace(/(\.\.\/)/g, ''),
		gulp.dest('./'),
		replace(/(js\/main)/, config.build.js.dist),
		gulp.dest('./')
	]);
});