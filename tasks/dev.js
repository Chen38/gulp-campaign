const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const stringify = require('stringify');
const source = require('vinyl-source-stream');
const pump = require('pump');
const bs = require('browser-sync').create();

const compassOptions = {
  'config_file': 'config.rb',
  'css': './.tmp/css',
  'sass': './src/sass'
}

gulp.task('compass', () => {
  pump([
    gulp.src('./src/sass/main.scss'),
    $.plumber(),
    $.compass(compassOptions),
    $.autoprefixer({
      browsers: ['last 10 versions']
    }),
    gulp.dest('./.tmp/css'),
    bs.stream()
  ])
});

gulp.task('browserify', () => {
  pump([
    browserify({
      entries: './src/js/app.js',
      debug: true
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
    gulp.dest('./.tmp/js'),
    bs.stream()
  ]);
});

gulp.task('refresh', () => {
  bs.init({
    files: [ './src/*.html' ],
    server: {
      baseDir: ['./src', './.tmp']
    },
    notify: false,
    open: false,
    port: 5386
  });

  gulp.watch('./src/sass/**/*.scss', ['compass']);
  gulp.watch('./src/js/**/*.js', ['browserify']);
});

gulp.task('dev', ['compass', 'browserify', 'refresh']);
