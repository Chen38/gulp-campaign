const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const pump = require('pump');
const bs = require('browser-sync').create();
const proxy = require('http-proxy-middleware');

const config = require('../config');

gulp.task('sass', () => {
  pump([
    gulp.src('./src/sass/main.scss'),
    $.plumber(),
    $.sourcemaps.init(),
    $.sass(config.sassOptions),
    $.autoprefixer(config.autoprefixerOptions),
    $.sourcemaps.write('./'),
    gulp.dest('./.tmp/css'),
    bs.stream()
  ])
});

gulp.task('less', () => {
  pump([
    gulp.src('./src/less/main.less'),
    $.plumber(),
    $.sourcemaps.init(),
    $.less(config.lessOptions)
    .on('error', (err) => {
      console.log(err);
    }),
    $.sourcemaps.write('./'),
    gulp.dest('./.tmp/css'),
    bs.stream()
  ])
});

// Browserify compile
gulp.task('browserify', () => {
  pump([
    browserify({
      entries: './src/js/app.js',
      debug: false
    })
    .transform(stringify, {
      appliesTo: { includeExtensions: ['.html'] },
      minify: true
    })
    .bundle()
    .on('error', (err) => {
      console.log(err);
    }),
    source('bundle.js'),
    buffer(),
    $.sourcemaps.init({ loadMaps: true }),
    $.sourcemaps.write('./'),
    gulp.dest('./.tmp/js'),
    bs.stream()
  ]);
});

/**
 * Set the default proxy options
 * Handle nothing but process
 *
 * See https://browsersync.io/docs/options#option-middleware
 */
let myProxy = {
  route: '',
  handle(req, res, next) {
    next();
  }
};

if (config.isProxy) {
  myProxy = proxy(config.proxyPath, config.proxyOptions);
}

gulp.task('refresh', () => {
  bs.init({
    files: [ './src/*.html' ],
    server: {
      baseDir: ['./src', './.tmp'],
      middleware: [ myProxy ]
    },
    notify: false,
    open: false,
    port: config.port
  });

  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch(['./src/js/**/*.js', './src/views/*.html'], ['browserify']);
});

gulp.task('dev', ['sass', 'browserify', 'refresh']);
