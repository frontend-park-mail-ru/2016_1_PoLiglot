define(function (require) {
    QUnit.module("views/viewManager");
    QUnit.test("Проверка работы ViewManager", function (assert) {
        var viewManager = require('views/viewManager');
        viewManager.hide();
        _.each(viewManager.views || , function(view) {
                view.hide();
                assert.equal($(this).is(":visible"), false);
            });
    });
});