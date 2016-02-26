define([
    'backbone',
    'views/main',
    'views/login',
    'views/scoreboard',
    'views/game',
    'views/registration',
    'views/lobby',
], function(
    Backbone,
    MainView,
    LoginView,
    ScoreboardView,
    GameView,
    RegistrationView,
    LobbyView
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
            MainView.show();// TODO
        },
        scoreboardAction: function () {
            ScoreboardView.show();
        },
        lobbyAction: function(){
            LobbyView.show();
        },
        gameAction: function () {
            GameView.show();// TODO
        },
        registrationAction: function() {
            RegistrationView.show();
        },
        loginAction: function () {
            LoginView.show();// TODO
        }
    });

    return new Router();
});