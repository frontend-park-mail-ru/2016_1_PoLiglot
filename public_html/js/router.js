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
        initialize: function () {
            this.viewManager = new ViewManager();


            this.viewManager.addView(MainView);
            this.viewManager.addView(LoginView);
            this.viewManager.addView(RegistrationView);
            this.viewManager.addView(ScoreboardView);
            this.viewManager.addView(LobbyView);
            this.viewManager.addView(GameView);
        },

        defaultActions: function () {
            MainView.show();
        },
        scoreboardAction: function () {
            ScoreboardView.show();
        },
        lobbyAction: function(){
            LobbyView.show();
        },
        gameAction: function () {
            GameView.show();
        },
        registrationAction: function() {
            RegistrationView.show();
        },
        loginAction: function () {
            LoginView.show();
        }
    });

    return new Router();
});