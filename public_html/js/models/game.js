define([
    'backbone'
], function (
    Backbone
) {

    var GameModel = Backbone.Model.extend({
        urlLogin: '/api/session/',
        urlRegistration: '/api/user/',
        urlFirstLevel: '/api/first_level',

        defaults: {
            id:  "",
            word: "",
            round_counter: 0,
            roundScore: 0,
            best: false

        },
        getSumResultForFirstLevel: function(){
            return this.save({}, {
                type: 'PUT',
                wait: true,
                url: this.urlFirstLevel
            });
        },
        getQuestion: function() {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.urlFirstLevel
            });
        },
        sendAnswerForFirstLevel: function(id,word) {
            return this.save({}, {
                type: 'POST',
                wait: true,
                url: this.urlFirstLevel,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id,
                    word: word
                }),
            });
        }


    });

    return new GameModel();

});