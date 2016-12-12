module.exports = {
	'dev': {
		'bower': {
			'requirejs': 'bower_components/requirejs/require.js',
			// 'zepto': 'bower_components/zepto/zepto.min.js',
			'jquery': 'bower_components/jquery/dist/jquery.min.js',
			'fastclick': 'bower_components/fastclick/lib/fastclick.js',
			'swiper': 'bower_components/swiper/dist/js/swiper.jquery.min.js'
			// 'normalize': 'bower_components/normalize-css/normalize.css'
		},
		'dest': {
			'js': 'vendor/js',
			'css': 'vendor/css'
		}
	},
	'build': {
		'js': {
			'dist': 'dist/js/app.min'
		}
	},
	'compass': {
		'config_file': 'config.rb',
		'css': 'css',
		'sass': 'sass'
	},
	'requirejs': {
		'paths': {
			'$': 'vendor/js/zepto.min',
			'wx': 'vendor/js/jweixin-1.0.0',
			'fastclick': 'vendor/js/fastclick'
		},
		'shim': {
			'js/app': ['$'],
			'js/fn': ['$']
		}
	},
	'spritesmith': {
		'imgName': 'sprite.png',
		'cssName': '_sprite.scss',
		'algorithm': 'binary-tree',
		'imgOpts': {
			'quality': 60
		}
	},
	'htmlmin': {
		'removeComments': true,
		'collapseWhitespace': true,
		'collapseBooleanAttributes': true,
		'removeEmptyAttributes': true,
		'removeStyleLinkTypeAttributes': true,
		'minifyJS': true,
        'minifyCSS': true
	}
}