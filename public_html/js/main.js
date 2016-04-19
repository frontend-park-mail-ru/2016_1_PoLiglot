require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery-1.10.2",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        jqueryUi: "lib/jquery-ui-1.10.4.custom",
        sweetAlert: "lib/sweetalert-dev",
        konva: "lib/konva.min"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery','jqueryUi','sweetAlert','konva'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jqueryUi':{
            deps: ['jquery']
        },
        'sweetAlert':{
        	deps: ['jquery'],
        	exports: 'sw'
        },
        'konva': {
        	deps: ['jquery'],
        	exports: 'Konva'
        }

    }
});

require([
    'backbone',
    'router'
], function(
    Backbone,
    router
){
    Backbone.history.start();
});
