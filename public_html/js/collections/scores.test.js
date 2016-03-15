define(function (require) {
    QUnit.module("models/score");

    QUnit.test('Check sorted collection', function() {
        var ScoresCollection = require('./scores');

        var result = true;

        for (var i = 0; i < ScoresCollection.length; i++) {
            if (ScoresCollection[i].score > ScoresCollection[i+1].score) {
                result = false;
            }
        }

        assert.equal( result, true );
    });

});