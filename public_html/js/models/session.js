define([
    'backbone'
], function (
    Backbone
) {

    var SessionModel = Backbone.Model.extend({
        urlLogin: '/api/session/',
        urlRegistration: '/api/user/',

        login: function (name, pass) {
            $.ajax({
                type: 'PUT',
                url: this.urlLogin,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    login: name,
                    password: pass
                }),
                success: function (data) {

                },
                error: function (xhr, str) {
                }

            });
        },

        isLoggedIn: function() {
            $.ajax({
                type: 'GET',
                url: this.urlLogin,
                success: function (data) {
                },
                error: function(data) {
                }

            });
        },

        logout: function() {
            $.ajax({
                type: 'DELETE',
                url: this.urlLogin,
            });
        },

        registration: function(name, pass, email) {
            $.ajax({
                type: 'PUT',
                url: this.urlRegistration,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    login: name,
                    password: pass,
                    email: email
                }),
                success: function (data) {
                    if (data.status === 0) {
                        alert(data);
                    } else {
                        alert("error");
                    }
                },
                error: function () {
                    alert("error");
                }
            });
        },

        isValidLogin: function(name, pass) {
            var errors = '.empty-field';
            var success = 'success';
            if (name && pass) {
                return success;
            }
            else return errors;
        },

        isValidRegistration: function(email, name, pass, passRepeat) {
            var errors = [
                '.js-invalid-mail','.js-empty-field','.js-little-pass','.js-pass-compare'
            ];
            var success = 'success';
            var exp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if ( !(email && name && pass && passRepeat) ) {
                return errors[1];
            } else if ( pass.len < 8 ) {
                return errors[2];
            } else if ( !(pass == passRepeat) ) {
                return errors[3];
            } else if (!exp.test(email)) {
                return errors[0];
            }
            return success;
        }

    });

    return new SessionModel();

});