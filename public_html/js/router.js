define([
    'backbone',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/game',
    'views/registration',
    'views/lobby',
    'views/viewManager'
], function(
    Backbone,
    MainView,
    LoginView,
    ScoreboardView,
    GameView,
    RegistrationView,
    LobbyView,
    ViewManager
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'lobby': 'lobbyAction',
            'signup': 'registrationAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            ViewManager.hide();
            MainView.show();
        },
        scoreboardAction: function () {
            ViewManager.hide();
            ScoreboardView.show();
        },
        lobbyAction: function(){
            ViewManager.hide();
            LobbyView.show();
        },
        gameAction: function () {
            ViewManager.hide();
            GameView.show();
        },
        registrationAction: function() {
            ViewManager.hide();
            RegistrationView.show();
        },
        loginAction: function () {
            ViewManager.hide();
            LoginView.show();
        }
    });

    return new Router();
});