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
                mainView.$el.appendTo("#page");
                viewManager.addView(loginView);
                loginView.$el.appendTo("#page");
                viewManager.addView(registerView);
                registerView.$el.appendTo("#page");
                viewManager.addView(scoreboardView);
                scoreboardView.$el.appendTo("#page");
                viewManager.addView(gameView);
                gameView.$el.appendTo("#page");
                viewManager.addView(lobbyView);
                lobbyView.$el.appendTo("#page");
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