define([
    'backbone'
], function (
    Backbone
) {

    var GameModel = Backbone.Model.extend({
        urlFirstLevel: "",
        urlBingApi: 'https://bingapis.azure-api.net/api/v5/images/search',

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
                data: ' ',
                url: this.urlFirstLevel
            });
        },
        getPicture: function(word) {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.urlBingApi,
                headers: {
                    "Ocp-Apim-Subscription-Key":"5f3c7707140c4e2ba3ade31b9ed94e33"
                },
                data: 'q='+word+'&count=10&offset=0&mkt=en-us&safeSearch=Moderate&height=200&width=200',
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