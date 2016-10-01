requirejs.config({
    baseUrl: "js/library",
    paths: {
		jquery: 'jquery.min',
		backbone: 'backbone.min',
		underscore: 'underscore.min',
		storage: 'jstorage',
		json: 'json2',
		jqueryUI: 'jquery-ui.min',
		appModels: '../Models',
		appViews: '../Views'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        jqueryui: ['jquery'],
		'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'json': {
            exports: 'JSON'
        },
        'storage': {
            deps: ['json', 'jquery'],
        }
    }
});

require(["jquery", "../application"], function ($, Application) {
	$(document).ready(function() {
		var myApplication = new Application();
		myApplication.init();
	});
});	 
