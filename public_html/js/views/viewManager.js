define([
    'backbone',
    'views/main',
    'views/game',
    'views/login',
    'views/scoreboard',
    'views/registration',
    'views/lobby'
], function(
    Backbone,
    MainView,
    GameView,
    LoginView,
    ScoreboardView,
    RegistrationView,
    LobbyView
){
    var ManagerView = Backbone.View.extend({
        views: [ MainView, GameView, LoginView, ScoreboardView, RegistrationView, LobbyView ],
        hide: function () {
            _.each(this.views , function(view) {
                console.log("скрыл");
                view.hide();
            });
        }
    });
    return new ManagerView();
});

