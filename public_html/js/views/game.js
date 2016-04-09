define([
    'backbone',
    'tmpl/game',
    'models/game',
    'models/session'
], function(
    Backbone,
    tmpl,
    game,
    session
){
    var GameView = Backbone.View.extend({
        template: tmpl,
        events:{
            'submit .form': "send"
        },
        initialize: function () {
            $('#page').html(tmpl());// TODO
        },
        render: function () {
            this.$el.html(tmpl());
            this.$timer = this.$("#timer");
            return this;
        },
        startTimer:function(){
        var now = new Date();
        var sec = now.getSeconds();
        var ms = now.getMilliseconds();
        
        var c = document.querySelector('#timer');
        var ctx = c.getContext('2d');
        ctx.arc(0, 0, 70, Math.PI*2, 0);
        ctx.save();// помещаем текущий контекст в стэк
        ctx.clearRect(0,0,150,150);
        ctx.translate(75, 75);
        ctx.scale(0.4,0.4);
        ctx.rotate(-Math.PI/2);

        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";

        ctx.save();
        ctx.lineWidth=24;
        ctx.strokeStyle ="#D40000";
        ctx.beginPath();
        ctx.arc(0,0,110,1.5*Math.PI,2*Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        
        ctx.beginPath();

        for (var i = 0; i < 12; i++) {
            ctx.rotate(Math.PI/6);
            ctx.moveTo(100,0);
            ctx.lineTo(120,0);
        }


        ctx.stroke();// нарисовали то, что ранее описали
        ctx.restore();// достаем последний сохраненный контекст из стэка

        ctx.save();
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.arc(0,0,140,0,2*Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.arc(0,0,150,0,2*Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        
        ctx.rotate((sec+ms/1000) * Math.PI/30);
        ctx.strokeStyle = "#D40000";// цвет контура
        ctx.fillStyle = "#D40000";
        ctx.lineWidth = 6;

        ctx.beginPath();
        ctx.moveTo(-30,0);
        ctx.lineTo(83,0);
        ctx.stroke();
        ctx.restore();

        ctx.lineWidth=3;
        ctx.beginPath();
        ctx.arc(0,0,5,0,2*Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.save();

        },
        loseSound:function(){
            var audio = new Audio(); // Создаём новый элемент Audio
            audio.src = '../../sounds/sound_lose.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true; // Автоматически запускаем 
        },
        beginSound:function(){
            var audio = new Audio(); // Создаём новый элемент Audio
            audio.src = '../../sounds/sound_begin.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true; // Автоматически запускаем 
        },
        parseQuestion:function() {
            game.getQuestion()
            .done(function(data){
                console.log(data);
                this.showShuffle(data);
            }.bind(this))
            .fail(function(){
                console.log("no");
            }.bind(this))
        },
        showShuffle: function(data){
            shuffle = data['shuffle'].toUpperCase();
            word_id = data['id'];
            length = shuffle.length;
            for(var i=0; i!=length; i++){
                console.log(shuffle[i]);
                $('.shuffle_string').append('<div class="letter"><p class="white_letter">'+shuffle[i]+'</p></div>');
            }
        },
        post: function(event){
            console.log(event);
           if(event){
               event.preventDefault();
            }
            console.log(23);
        },
        show: function () {
            this.$el.show();
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");// TODO
            alert("Игра начнётся как только вы нажмёте ок");
            this.loseSound();
            this.parseQuestion();
            setInterval(function(){
                this.startTimer()}.bind(this)
                ,62.5);
            console.log(20);
        },
        hide: function () {
            this.$el.hide();// TODO
        }

    });

    return new GameView();
});