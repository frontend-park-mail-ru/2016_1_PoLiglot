define([
    'backbone',
    'tmpl/main'
], function(
    Backbone,
    tmpl
){

    var mainView = Backbone.View.extend({
       
        events: {
            "click .main-menu__button" : "hide",
            "click .main-menu-link" : "hide"
        },
        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl());// TODO
        },
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
            this.$('.js-main-menu__button').show("slow");
        },
    });

    return new mainView();
});