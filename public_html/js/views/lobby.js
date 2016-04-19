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
        jumpingCup: function() {
            var width = $('#container').innerWidth();
            var height = $('#container').innerHeight();
            console.log(width);
            var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: 250
            });

            var layer = new Konva.Layer();
    
            var cupImg = new Konva.Image({
                x: (stage.getWidth()/2 - 50),
                y: (stage.getHeight()/2),
                width: 100,
                height: 100,
                draggable: true,
            });
            layer.add(cupImg);
            stage.add(layer);

            var imageObj1 = new Image();
            imageObj1.onload = function() {
                cupImg.image(imageObj1);
                layer.draw();
            };
            imageObj1.src = '../../../img/cup.png';

            var amplitude = 10;
            var period = 500;
            var centerY = stage.getHeight() / 2;

            var anim = new Konva.Animation(function(frame) {
                cupImg.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY);
            }, layer);

            anim.start();
        },
        getSumResult:function(data){
            if(data['score'] > 0){
                $('.js-result').text('Результат:'+data['score']);
            }
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.trigger("show",this);
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");
            this.jumpingCup();
            Game.getSumResultForFirstLevel()
            .always(function(data){
                this.getSumResult(data);
            }.bind(this));
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new LobbyView();
});