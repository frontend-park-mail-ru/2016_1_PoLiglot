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
            this.render()
        },
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        show: function () {
            this.$el.show();
            this.trigger("show",this);
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new LobbyView();
});