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
            this.render()
        },
        render: function () {
            this.$el.html(tmpl({collection: players.toJSON()}));
            return this;
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.$('.main').fadeIn("slow");// TODO
            this.trigger("show",this);
            
        },
        hide: function () {
            this.$el.hide();
        },

    });

    return new scoreboardView();
});