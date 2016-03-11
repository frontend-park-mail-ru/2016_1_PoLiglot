define(function(require) {
    QUnit.module('collections/scores');

    QUnit.test('Проверка сортировки коллекции', function () {
        var scores = require('collections/scores').toJSON(),
            scoresSorted = _.sortBy(scores, function (model) {
                return -model.score;
            });

        QUnit.ok(_.isEqual(scores, scoresSorted), 'Returned array is sorted');
    });
});