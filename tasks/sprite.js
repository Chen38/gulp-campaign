const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const pump = require('pump');

const spriteOptions = {
  imgName: 'sprite.png',
  cssName: '_sprite.scss',
  algorithm: 'binary-tree',
  imgPath: '../assets/img/sprite.png',
  imgOpts: {
    quality: 60
  }
};

gulp.task('generateSprite', () => {
  pump([
    gulp.src('./src/sprite/*'),
    $.spritesmith(spriteOptions),
    gulp.dest('./src/sprite/build')
  ]);
});

gulp.task('moveSprite', () => {
  pump([
    gulp.src('./src/sprite/build/_sprite.scss'),
    gulp.dest('./src/sass')
  ]);
  pump([
    gulp.src('./src/sprite/build/sprite.png'),
    gulp.dest('./src/assets/img')
  ]);
});
