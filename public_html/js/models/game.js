define([
    'backbone'
], function (
    Backbone
) {

    var GameModel = Backbone.Model.extend({
        urlFirstLevel: "",
        urlBingApi: 'https://bingapis.azure-api.net/api/v5/images/search',
         
        getPicture: function(word) {
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.urlBingApi,
                mode: 'no-cors',
                headers: {
                    "Ocp-Apim-Subscription-Key":"dacd8c7839df47f7800e17466ee5f260"
                },
                data: 'q='+word+'&count=10&offset=0&mkt=en-us&safeSearch=Moderate&height=200&width=200',
            });    
        },
    });

    return new GameModel();

});