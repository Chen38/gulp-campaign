require.config({
	baseUrl: '../',
	paths: {
		$: 'vendor/js/zepto.min',
		wx: 'vendor/js/jweixin-1.0.0',
		fastclick: 'vendor/js/fastclick'
	},
	shim: {
		'js/app': ['$'],
		'js/fn': ['$']
	}
});
require(['js/app'], function() {
	
	$(function() {
		
		var FastClick = require('fastclick');
		FastClick.attach(document.body);
		
	});
	
});