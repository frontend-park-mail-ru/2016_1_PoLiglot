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
                headers: {
                    "Ocp-Apim-Subscription-Key":"5f3c7707140c4e2ba3ade31b9ed94e33"
                },
                data: 'q='+word+'&count=10&offset=0&mkt=en-us&safeSearch=Moderate&height=200&width=200',
            });    
        },
    });

    return new GameModel();

});