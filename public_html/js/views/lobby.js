define([
    'backbone',
    'tmpl/lobby'
], function(
    Backbone,
    tmpl

){
    var LobbyView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl());
        },
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        show: function () {
            this.$el.show();
            $('#page').html(this.render().$el);
            this.$('.main').fadeIn("slow");
            this.$('..main-form__button__forward').removeAttr("disabled",true);
            this.$('.lobby__title').fadeIn("slow");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new LobbyView();
});