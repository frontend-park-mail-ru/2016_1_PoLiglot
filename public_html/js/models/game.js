define([
    'backbone'
], function (
    Backbone
) {

    var GameModel = Backbone.Model.extend({
        urlLogin: '/api/session/',
        urlRegistration: '/api/user/',
        urlFirstLevel: '/api/first_level',

        

        getQuestion: function() {
            console.log("Модель")
            return this.save({}, {
                type: 'GET',
                wait: true,
                url: this.urlFirstLevel
            });
        },


    });

    return new GameModel();

});