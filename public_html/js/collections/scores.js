define([
	'backbone',
	'models/score'
], function(
	Backbone,
	playerModel
){

    var ScoreCollection = Backbone.Collection.extend({
    	model: playerModel,
    	comparator: function(player) {
            return -player.get('score');   
        }
    });

    return new ScoreCollection([
    	{name: 'Stepan123', score: 16},
    	{name: 'IGORR', score: 1.4},
    	{name: 'Dmitr55343', score: 33},
    	{name: 'supergamer123', score: -7},
    	{name: 'Vitaly', score: 45},
    	{name: 'Sanja77', score: 2},
    	{name: 'Max', score: 25},
    	{name: 'Eddy1986', score: 0},
    	{name: 'gamefun', score: 0}
    ]);
});