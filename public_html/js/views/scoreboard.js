define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    players

){
    var scoreboardView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            $('#page').html(tmpl({collection: players.toJSON()}));// TODO
        },
        render: function () {
            this.$el.html(tmpl({collection: players.toJSON()}));
            return this;
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");// TODO
        },
        hide: function () {
            // TODO
        }

    });

    return new scoreboardView();
});