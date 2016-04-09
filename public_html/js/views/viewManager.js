define(['backbone'], function(Backbone) {
    var views = [];
    var Manager = Backbone.View.extend({
        el: '#page',
        addView: function(currentView) {
            this.$el.append(currentView.el);
            views.push(currentView);
            this.listenTo(currentView, "show", function() {
                views.forEach( function(view) {
                    if (view != currentView)
                        view.hide();
                });
            });
        }
    });
    return Manager;
});



