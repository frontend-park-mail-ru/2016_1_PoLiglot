define(function (require) {
    var Backbone = require('backbone');

    var Manager = Backbone.View.extend({
        views: [],

        addView: function (currentView) {
            this.views.push(currentView);
            this.listenTo(currentView, 'show', this.onShow.bind(this, currentView));
        },

        onShow: function (currentView) {
            this.views.forEach(function (view) {
                if (view !== currentView) {
                    view.hide();
                }
            });
        }

    });

    return new Manager();
});


