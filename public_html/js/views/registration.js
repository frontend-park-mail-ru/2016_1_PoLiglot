define([
    'backbone',
    'tmpl/registration',
    'models/session'
], function(
    Backbone,
    tmpl,
    session
){

    var registrationView = Backbone.View.extend({

        template: tmpl,
        events: {
            'submit .form': 'send'
        },
        initialize: function () {
            this.render();
        },
        generateClass: function(str) {
            return '.js-'+str;
        },
        render: function () {
            this.$el.html(tmpl());
            this.$name = this.$("input[name=login]");
            this.$pass = this.$("input[name=password]");
            this.$passRepeat = this.$("input[name=password_repeat]");
            this.$email = this.$("input[name=email]");
            this.$error = this.$(".js-error");
            this.$errorAlert = this.$(".js-error-alert");
            return this; 
        },
        show: function () {
            this.$el.appendTo("#page");
            this.$el.show();
            this.$('.main').fadeIn("slow");
            this.trigger("show",this);
            
        },
        hide: function () {
            this.$el.hide();
        },
        send: function(event){
            event.preventDefault();
            this.$error.fadeOut('fast');
            this.$errorAlert.fadeOut('fast');

            var email = this.$email.val();
            var name = this.$name.val();
            var pass = this.$pass.val();
            var passRepeat = this.$passRepeat.val();
            var valid = session.ValidRegistration(email, name, pass, passRepeat);

            if (valid == 'success'){
            	session.registration(name,pass,email)
            	.fail(
                    function(event) {
                            var error = ".js-"+ event.status + "-status"
                            console.log(error);
                            $(".js-error").fadeIn("fast");
                            $(error).fadeIn("fast");
                })
                .done(
                    function() {
                        Backbone.history.navigate('login',true );
                }.bind(this));
                //$(window).off();
            } else{
            	this.$error.fadeIn('fast');
            	this.$(this.generateClass(valid)).fadeIn('fast');
            }

        }

    });
    return new registrationView();
});