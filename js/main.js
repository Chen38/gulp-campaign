require.config({
	'baseUrl': '../',
	'paths': {
		'$': 'vendor/js/jquery.min',
		'fastclick': 'vendor/js/fastclick',
		'swiper': 'vendor/js/swiper.jquery.min'
	},
	'shim': {
		'swiper': ['$'],
		'js/app': ['$', 'swiper'],
		'js/fn': ['$']
	}
});
require(['js/app'], function() {
	
	$(function() {
		
		var FastClick = require('fastclick');
		FastClick.attach(document.body);
		
	});
	
});