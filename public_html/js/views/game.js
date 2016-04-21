define([
    'backbone',
    'tmpl/game',
    'models/game',
    'models/session'
], function(
    Backbone,
    tmpl,
    Game,
    session
){
    var GameView = Backbone.View.extend({
        template: tmpl,
        events:{
            'mousedown .letter':'moveBlock',
            'click .send': 'post'
            
        },
        initialize: function () {
            console.log(session.get("login"));
            this.render();
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
        ctx.save();
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


        ctx.stroke();
        ctx.restore();

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
        moveBlock: function(obj_event){
            $('.shuffle_string').sortable();
        },
        loseSound:function(){
            var audio = new Audio(); 
            audio.src = '../../sounds/sound_lose.mp3'; 
            audio.autoplay = true;
        },
        beginSound:function(){
            var audio = new Audio(); // Создаём новый элемент Audio
            audio.src = '../../sounds/sound_begin.mp3'; // Указываем путь к звуку "клика"
            audio.autoplay = true; // Автоматически запускаем 
        },
        parseQuestion:function() {
            console.log(session.get("login"));
            Game.getQuestion()
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
            Game.set({"id":word_id});
            length = shuffle.length;
            for(var i=0; i!=length; i++){
                console.log(shuffle[i]);
                $('.shuffle_string').append('<div class="letter letter-event"><p class="white_letter">'+shuffle[i]+'</p></div>');
             }
            $('.question_field').append('<img class="question_img" src="../pics/'+data['right']+'.jpg">');
        },
        
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.trigger("show", this);
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");// TODO
            //alert("Игра начнётся как только вы нажмёте ок");
            this.beginSound();
            this.parseQuestion();
            setInterval(function(){
                this.startTimer()}.bind(this)
                ,62.5);
        },
        hide: function () {
            $('.letter').remove();
            $('.question_img').remove();
            this.$el.hide();// TODO
        },
        getSumResult:function(data){
            Game.set({'score':data['score'], 'best':data['best']});
            console.log(data);
            swal({
                title: 'xxx',
                text: "Результат: "+data['score'],
                type: 'success',
                showConfirmButton: true
            },function() {

            });
        },
        getAnswer: function(data){
            var round_counter = Game.get('round_counter');
            round_counter++;
            var type='success';
            var win_status = 'Правильный ответ!'

            Game.set({'round_counter':round_counter});
            if(data['answer'] ){
                $('.main').effect('highlight',{color: "#05f04b"},250);
                
            } else {
                $('.main').effect('highlight',{color: "red"},250);
                type='error';
                win_status="Неправильный ответ!"
            }
            swal({
                title: win_status,
                text: "Правильное слово: "+data['right'], 
                type: type,  
                showConfirmButton: true 
            },function() {
                if(round_counter < 5) {
                    this.hide();
                    this.show();
                }
                 else{
                    Game.set({'round_counter':0});
                    Backbone.history.navigate('lobby',true );
                }
            }.bind(this));
        },
        post: function(event) {
            var right = "";
            if(event){
               event.preventDefault();
            }
            $('.letter').each(function(){
               right = right + $(this).text();
            });
            right = right.toLowerCase();
            var user = session.get('user')
            var id = Game.get('id');
            Game.sendAnswerForFirstLevel(id,right)
            .always(function(data){
                this.getAnswer(data);
            }.bind(this));
        },
    });
    return new GameView();
});