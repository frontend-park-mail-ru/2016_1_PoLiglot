define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var loginView = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl());   // TODO
        },
        render: function () {
            this.$el.html(tmpl());
            return this; // TODO
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
        },
        hide: function () {
            $('#page').html(this.render().$el);
            this.$('.main-menu__button').hide("slow");
            this.$('#main').fadeOut("slow"); // TODO
        }

    });

    return new loginView();
});