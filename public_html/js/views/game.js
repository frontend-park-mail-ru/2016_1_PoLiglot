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
    var ws ;
    var anim ;
    var GameView = Backbone.View.extend({
        template: tmpl,
        urlFirstLevel: "ws://localhost:8080/api/gameplay",
        events:{
            'click .send': 'post',
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(tmpl());
            this.$timer = this.$("#timer");
            return this;
        },
        startTimer:function(){

        var stage = new Konva.Stage({
            container: 'timer',  // индификатор div контейнера
            width: 150,
            height: 160,
        });
        
        var layer = new Konva.Layer();
        var center_y = stage.height() / 2;
        var center_x = stage.width() / 2;

        var mech = new Konva.Rect({
            x:0,
            y: -70,
            width: 10,
            height: 25,
            fill: 'red',
            offset : {
                x: -70,
                y: -90
            }
        });
        mech.fillLinearGradientColorStops(0, 'red', 0.5, 'blue', 1, 'green');
        layer.add(mech);

        var mech2 = new Konva.Rect({
            x:0,
            y: -80,
            width: 26,
            height: 10,
            fill: 'red',
            offset : {
                x: -62,
                y: -95
            }
        });
        layer.add(mech2);


        var mech3 = new Konva.Rect({
            x: 34,
            y: 44,
            width: 10,
            height: 25,
            fill: 'red'
        });
        mech3.rotate(45);
        layer.add(mech3);

        var mech4 = new Konva.Rect({
            x: 30,
            y: 50,
            width: 26,
            height: 10,
            fill: 'red',
        });
        mech4.rotate(45);
        layer.add(mech4);


        var mech5 = new Konva.Rect({
            x: 109,
            y: 52,
            width: 10,
            height: 25,
            fill: 'red'
        });
        mech5.rotate(315);
        layer.add(mech5);

        var mech6 = new Konva.Rect({
            x: 100,
            y: 70,
            width: 26,
            height: 10,
            fill: 'red',
        });
        mech6.rotate(315);
        layer.add(mech6);

        

        var circle1 = new Konva.Circle({
            x: stage.width() / 2,
            y: 100,
            radius: 52,
            fill: 'white',
            stroke: '#265a88',
            strokeWidth: 8
        });
        layer.add(circle1);

        var arc = new Konva.Arc({
            x: stage.getWidth() / 2,
            y: stage.getHeight() / 2,
            innerRadius: 33,
            outerRadius: 41,
            //angle: 90,
            rotation:180,
            fill: 'red',
        });
        layer.add(arc);

        var divs = [12]; 
           
        
        for(var i=0;i!=12; i++){
            var grad = i *30;
            if( i == 0 || i == 3 || i ==6 || i==9){
                divs[i] = new Konva.Line({
                    points: [34, 0, 44, 0],
                    stroke: 'black',
                    strokeWidth: 2,
                    lineCap: 'round',
                    lineJoin: 'round',
                });
            } else {
                divs[i] = new Konva.Line({
                    points: [34, 0, 40, 0],
                    stroke: 'black',
                    strokeWidth: 2,
                    lineCap: 'butt',
                    lineJoin: 'round',
                });
            }
            divs[i].move({
                x:center_x,
                y:100
            });
            divs[i].rotate(grad);
            layer.add(divs[i]);
        }

        redLine = new Konva.Line({
            points: [0, -30, 0, 0],
            stroke: 'red',
            strokeWidth: 2,
            lineCap: 'round',
            lineJoin: 'round',
        });

        redLine.move({
            x:center_x,
            y:100
        });

        layer.add(redLine);

        var ring = new Konva.Ring({
            x: 0,
            y: -80,
            innerRadius: 16,
            outerRadius: 20,
            fill:'red',
            offset : {
                x: -75,
                y: -100
            }
        });
        layer.add(ring);

        

        stage.add(layer);
        var angularSpeed = 6;
        anim = new Konva.Animation(function(frame) {
            var angleDiff = frame.timeDiff * angularSpeed / 1000;
            redLine.rotate(angleDiff);
            arc.angle(angleDiff);
            arc.rotate(angleDiff);
        }, layer);

        anim.start();
        setTimeout(function(){
                anim.stop();
            },60000);
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
            ws.send("{\"action\":\"getWord\"}");
        },
        getPicture: function(picture){
            Game.getPicture(picture)
            .always(function(data){
                var src = data['value'][0]['contentUrl'];
                $('.question_img').remove();
                $('.question_field').append('<img class="question_img" src="'+src+'">');
            }.bind(this));
            
        },
        removeContent : function(){
            $('.letter').remove();
            $('.question_img').remove();
        },
        showShuffle: function(data){
            shuffle = data['shuffleWord'].toUpperCase();
            word_id = data['id'];
            Game.set({"id":word_id});
            length = shuffle.length;
            for(var i=0; i!=length; i++){
                console.log(shuffle[i]);
                $('.shuffle_string').append('<div class="letter letter-event">'+shuffle[i]+'</div>');
            }
            $('.shuffle_string').sortable({
                distance:10,
                revert: true,
                axis:'x'
            });
            this.getPicture(data['right']);
             
            
        },
        showScreen: function(data) {
            this.$('.main').fadeIn("slow");
            this.$('.lobby__title').fadeIn("slow");
            var user = data['user'];
            var enemy =data['enemy'];
            $('.user').text(user);
            $('.enemy').text(enemy);
            var userRecord = $('.userRecord').text() + data['userRecord'];
            var enemyRecord = $('.enemyRecord').text() + data['enemyRecord'];
            $('.userRecord').text(userRecord);
            $('.enemyRecord').text(enemyRecord);
            var userScore = $('.myScore').text() + '0';
            var enemyScore = $('.enemyScore').text() + '0';
            $('.myScore').text(userScore);
            $('.enemyScore').text(enemyScore);

        },
        hideScreen: function() {
            this.$('.main').fadeOut("slow");
            this.$('.lobby__title').fadeOut("slow");
            if(anim) {
                anim.stop();
            }
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.trigger("show", this);
            this.startWebSocket();
            
        },
        hide: function () {          
            this.removeContent();
            this.hideScreen();
            if(ws) {
                ws.close();
            }
            console.log('game view hide');
            this.$el.hide();// TODO
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
                this.removeContent();
                this.parseQuestion();
            }.bind(this));
        },
        startWebSocket: function(){
            ws = new WebSocket(this.urlFirstLevel);
            ws.onopen = function (event) {
                
                swal({
                    title: "Поиск соперника...",
                    text : '<center><div class="loading2"></div></center>',
                    html: true,
                    showConfirmButton: false
                });
                this.jumpingCup();
            }.bind(this);
            ws.onmessage = function (event) {
                console.log(event);
                var data = JSON.parse(event.data);
                switch(data['action']){
                    case 'enemyLeft':
                        swal({
                            title: "Внимание",
                            text: "Cоперник внезапно покинул игру", 
                            type: 'success',  
                            showConfirmButton: true 
                        });
                        Backbone.history.navigate('lobby',true );
                        break;
                    case 'startGame':
                        $('h2').text('Игра начнётся через 3 секунды');
                        setTimeout(function(){
                            swal.close();
                            this.beginSound();
                            this.showScreen(data);
                            this.parseQuestion();
                            this.startTimer();
                        }.bind(this),3000);
                        
                        break;
                    case 'getWord':
                        this.showShuffle(data);
                        break;
                    case 'checkWord':
                        this.getAnswer(data);
                        $('.myScore').text(data['myScore']);

                        $('.enemyScore').text(data['enemyScore']);
                        break;

                    case 'finishGame':
                        var status;
                        if(data['equality']){
                            status = 'Ничья';
                        } else {
                            if(data['win']==true){
                                status = 'Вы выиграли!';

                            } else {
                                status = 'Вы проиграли!'
                            }
                        }
                        swal({
                            title: status,
                            text: data['user'] + data['myScore'] + data['enemy'] + data['enemyScore'], 
                            type: 'success',  
                            showConfirmButton: true 
                        },function() {

                            Backbone.history.navigate('lobby',true );
                        }.bind(this));
                        break;


                }
                
            }.bind(this)
            ws.onerror = function(event){
                console.log(event);

            }
        },
        jumpingCup: function() {
            var width = $('#container').innerWidth();
            
            console.log(width);
            var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: 150
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
            var centerY = stage.getHeight() / 2 -50;

            var anim = new Konva.Animation(function(frame) {
                cupImg.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY);
            }, layer);

            anim.start();
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
            ws.send("{\"action\":\"checkWord\",\"id\":"+id+",\"word\":\""+right+"\"}");
        },
    });
    return new GameView();
}); 