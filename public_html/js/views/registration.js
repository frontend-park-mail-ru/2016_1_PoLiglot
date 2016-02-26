define([
    'backbone',
    'tmpl/registration'
], function(
    Backbone,
    tmpl
){

    var registrationView = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl());   // TODO
        },
        render: function () {
            this.$el.html(tmpl());
            return this;// TODO
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");  // TODO
        },
        hide: function () {
            $('#page').html(tmpl()); // TODO
        }

    });

    return new registrationView();
});