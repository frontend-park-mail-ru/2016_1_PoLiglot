define([
	'backbone',
	'models/score'
], function(
	Backbone,
	playerModel
){
    var resp
    var ScoreCollection = Backbone.Collection.extend({
    	model: playerModel,
        url:'api/scoreboard',
        initialize: function(){
        this.fetch({
            success: this.fetchSuccess,
            error: this.fetchError
        });
        },
        fetchSuccess: function (collection, response) {
            console.log(response);
            resp = response;
               return response;
        }

    });
    console.log(resp);
    return new ScoreCollection();
});