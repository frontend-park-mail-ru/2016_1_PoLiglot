define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl

){
    var GameView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl());// TODO
        },
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        show: function () {
            this.$el.show();
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
            this.$('..main-form__button__forward').removeAttr("disabled",true);
            this.$('.lobby__title').fadeIn("slow");// TODO
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();// TODO
        }

    });

    return new GameView();
});