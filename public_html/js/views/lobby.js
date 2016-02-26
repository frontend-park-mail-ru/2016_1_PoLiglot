define([
    'backbone',
    'tmpl/lobby'
], function(
    Backbone,
    tmpl

){
    var lobbyView = Backbone.View.extend({
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
            this.$('#main').fadeIn("slow");// TODO
        },
        hide: function () {
            // TODO
        }

    });

    return new lobbyView();
});