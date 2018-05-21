const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const config = require('../config');

gulp.task('uglify', () => {
  pump([
    gulp.src('./.tmp/js/bundle.js'),
    $.uglify(),
    gulp.dest(path.resolve(__dirname, `../${config.buildPath}/js`))
  ]);
});

gulp.task('minifyCss', () => {
  pump([
    gulp.src([
      './.tmp/css/*.css',
      '!./.tmp/css/*.map',
    ]),
    $.cleanCss(),
    gulp.dest(path.resolve(__dirname, `../${config.buildPath}/css`))
  ]);
});

gulp.task('copy', () => {
  pump([
    gulp.src(['./src/assets/**/*']),
    gulp.dest(path.resolve(__dirname, `../${config.buildPath}/assets`))
  ]);
  pump([
    gulp.src(['./src/index.html']),
    $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    }),
    gulp.dest(path.resolve(__dirname, `../${config.buildPath}`))
  ])
});

gulp.task('build', ['uglify', 'minifyCss', 'copy']);
