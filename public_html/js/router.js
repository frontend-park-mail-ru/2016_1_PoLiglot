define(function (require) {
        var Backbone = require('backbone'),
            mainView = require('views/main'),
            loginView = require('views/login'),
            registerView = require('views/registration'),
            scoreboardView = require('views/scoreboard'),
            gameView = require('views/game'),
            viewManager = require('views/viewManager');
            lobbyView = require('views/lobby');

        var Router = Backbone.Router.extend({
            routes: {
                'login': 'loginAction',
                'signup': 'registerAction',
                'scoreboard': 'scoreboardAction',
                'game': 'gameAction',
                'lobby': 'lobbyAction',
                '*default': 'defaultAction'
            },

            initialize: function () {
                viewManager.addView(mainView);
                viewManager.addView(loginView);
                viewManager.addView(registerView);
                viewManager.addView(scoreboardView);
                viewManager.addView(gameView);
                viewManager.addView(lobbyView);
            },
            loginAction: function () {
                loginView.show();
            },
            registerAction: function () {
                registerView.show();
            },
            scoreboardAction: function () {
                scoreboardView.show();
            },
            gameAction: function () {
                gameView.show();
            },
            defaultAction: function () {
                mainView.show();
            },
            lobbyAction: function() {
                lobbyView.show();
            }
        });

        return new Router();
    }
);