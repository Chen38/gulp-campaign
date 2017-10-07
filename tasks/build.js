const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

gulp.task('uglify', () => {
  pump([
    gulp.src('./.tmp/js/bundle.js'),
    $.uglify(),
    gulp.dest('./dist/js')
  ]);
});

gulp.task('minifyCss', () => {
  pump([
    gulp.src([
      './.tmp/css/*.css',
      '!./.tmp/css/*.map',
    ]),
    gulp.dest('./dist/css')
  ]);
});

gulp.task('copy', () => {
  pump([
    gulp.src(['./src/assets/**/*']),
    gulp.dest('./dist/assets')
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
    gulp.dest('./dist')
  ])
});

gulp.task('build', ['uglify', 'minifyCss', 'copy']);
