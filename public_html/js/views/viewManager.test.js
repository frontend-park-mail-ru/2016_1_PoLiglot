define(function (require) {
    QUnit.module('views/manager');

    QUnit.test("viewManager - экземпляр Backbone.View", function (assert) {
        var Backbone = require('backbone'),
            viewManager = require('views/viewManager');
        assert.ok(viewManager instanceof Backbone.View, "viewManager - экземпляр Backbone.View");
    });

    QUnit.test("viewManager works", function (assert) {
        var Backbone = require('backbone'),
            viewManager = require('views/viewManager');

        var SomeView = Backbone.View.extend({
                initialize: function () {
                    this.key = false;
                },

                show: function () {
                    this.trigger('show');
                },

                hide: function () {
                    this.key = true;
                }
            }),

            firstView = new SomeView(),
            secondView = new SomeView();

        viewManager.addView(firstView);
        viewManager.addView(secondView);

        firstView.show();
        assert.ok(secondView.key, "hide second when show first");
        secondView.show();
        assert.ok(firstView.key, "hide first when show second");

    });
});