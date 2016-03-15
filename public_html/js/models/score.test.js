define(function (require) {
    QUnit.module("models/score");

    QUnit.test("ScoreModel - экземпляр Backbone.Model", function () {

        var ScoreModel = require('./score'),
            score = new ScoreModel();

        QUnit.ok(score instanceof Backbone.Model);

    });

     QUnit.test("Scoreboard.getScores() returns {\'scores\': [...]}", function () {
        var Backbone = require('backbone'),
            _ = require('underscore'),
            scoreboard = require('models/score')


        QUnit.ok(scores.scores, 'Scores has scores field');
        QUnit.ok(Array.isArray(scores.scores), 'Scores contains array');

        // Проверяем упорядочен ли массив
        var scoresSorted = _.sortBy(scores.scores, 'name');
        var isScoresEqual = function(array1, array2) {
            if (array1.length !== array2.length) {
                return false;
            }
            for (var i = 0; i < array1.length; i++) {
                if (array1[i].name !== array2[i].name && array1[i].score !== array2[i].score) {
                    return false;
                }
            }
            return true;
        };

        QUnit.ok(isScoresEqual(scores.scores, scoresSorted), 'Returned array not sorted');

    });
});
