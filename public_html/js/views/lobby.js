define([
    'backbone',
    'tmpl/lobby',
    'models/game'
], function(
    Backbone,
    tmpl,
    Game

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
        getSumResult:function(data){
            if(data['score'] > 0){
                $('.js-result').text('Результат:'+data['score']);
            }
            if(data['best']) {
                this.jumpingCup();
            }
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.trigger("show",this);
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new LobbyView();
});