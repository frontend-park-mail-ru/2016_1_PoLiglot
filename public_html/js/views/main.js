define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var mainView = Backbone.View.extend({
        
    	template: tmpl,
        events: {
            "click .main-menu__button" : "hide"
        },
        initialize: function () {
            $('#page').html(tmpl());// TODO
        },
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('#main').fadeIn("slow");
            this.$('.main-menu__button').show("slow");
            this.$el.find('.main-menu__button').on('click', function (event) {
               this.$('.main-menu__button').fadeOut("slow");
                this.$('#main').hide("slow"); 
            });
        },
        hide: function () {
            $('#page').html(this.render().$el);
            this.$('.main-menu__button').fadeOut("slow");
            this.$('#main').hide("slow");
        }

    });

    return new mainView();
});