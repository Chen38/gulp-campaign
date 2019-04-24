/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const pump = require('pump')
const { buildPath, uglifyOptions, injectOptions } = require('../config')

const JS_DEST_PATH = path.resolve(__dirname, `../${buildPath}/js`)
const CSS_DEST_PATH = path.resolve(__dirname, `../${buildPath}/css`)
const ASSETS_DEST_PATH = path.resolve(__dirname, `../${buildPath}/assets`)

gulp.task('uglify', () => {
    pump([
        gulp.src('./.tmp/js/bundle.js'),
        $.uglify(uglifyOptions),
        $.rev(),
        gulp.dest(JS_DEST_PATH),
    ])
})

gulp.task('minifyCss', () => {
    pump([
        gulp.src([
            './.tmp/css/*.css',
            '!./.tmp/css/*.map',
        ]),
        $.cleanCss(),
        $.rev(),
        gulp.dest(CSS_DEST_PATH),
    ])
})

gulp.task('minifyHtml', () => {
    pump([
        gulp.src([ './src/index.html' ]),
        $.inject(
            gulp.src(
                [
                    `${JS_DEST_PATH}/*.js`,
                    `${CSS_DEST_PATH}/*.css`,
                ], {
                    read: false,
                },
            ),
            injectOptions,
        ),
        $.htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true,
        }),
        gulp.dest(path.resolve(__dirname, `../${buildPath}`)),
    ])
})

gulp.task('copy', () => {
    pump([
        gulp.src([ './src/assets/**/*' ]),
        gulp.dest(ASSETS_DEST_PATH),
    ])
})

gulp.task('build', [ 'uglify', 'minifyCss', 'copy' ])
