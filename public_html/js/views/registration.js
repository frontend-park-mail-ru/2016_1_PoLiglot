define([
    'backbone',
    'tmpl/registration'
], function(
    Backbone,
    tmpl
){

    var registrationView = Backbone.View.extend({

        template: tmpl,
        events: {
            submit: "send"
        },
        initialize: function () {
            $('#page').html(tmpl());
              // TODO
        },
        render: function () {
            this.$el.html(tmpl());
            this.$name = this.$("input[name=login]");
            this.$pass = this.$("input[name=password]");
            this.$passRepeat = this.$("input[name=password_repeat]");
            this.$email = this.$("input[name=email]");
            this.$error = this.$(".error");
            this.$errorAlert = this.$(".error-alert");
            this.$emptyField = this.$(".empty-field");
            this.$littlePass = this.$(".little-pass");
            this.$invalidMail = this.$(".invalid-mail");
            this.$invalidLogin = this.$(".invalid-login");
            this.$passCompare = this.$(".pass-compare");
            return this; // TODO"
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
        },
        send: function(event){
            event.preventDefault();
            this.$errorAlert.fadeOut('fast');
            this.$error.fadeOut('fast');

            if(!this.$name.val() || !this.$pass.val() || !this.$passRepeat.val() || !this.$email){
                this.$error.fadeIn('fast');
                this.$emptyField.fadeIn('fast');
                return;
            }
            var email = this.$email.val();
            var name = this.$name.val();
            var pass = this.$pass.val();
            var passRepeat = this.$passRepeat.val();

            if(pass.length < 8 ){
                this.$error.fadeIn('fast');
                this.$littlePass.fadeIn('fast');
                return;
            }
            if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)){
                this.$error.fadeIn('fast');
                this.$invalidMail.fadeIn('fast');
                return;
            }
            if(!/\w/.test(pass) || !/\w/.test(name)){
                this.$error.fadeIn('fast');
                this.$invalidLogin('fast');
                return;
            }

            if(pass != passRepeat){
                this.$error.fadeIn('fast');
                this.$passCompare.fadeIn('fast');
                return;
            }


        }

    });

    return new registrationView();
});