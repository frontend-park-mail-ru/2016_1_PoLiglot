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
            'submit .form': "send"
        },
        initialize: function () {
            
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
            this.$el.show();
            $('#page').html(this.render().$el);
            this.$('.main').fadeIn("slow");
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
            	session.registration(name,pass,email);
            	$(window).ajaxError(
                    function(event,jqXHR) {
                            var error = ".js-"+ jqXHR.status + "-status"
                            console.log(error);
                            $(".js-error").fadeIn("fast");
                            $(error).fadeIn("fast");
                });
                $(window).ajaxSuccess(
                    function() {
                        Backbone.history.navigate('login', { trigger: true })
                });
            } else{
            	this.$error.fadeIn('fast');
            	this.$(this.generateClass(valid)).fadeIn('fast');
            }

        }

    });
    return new registrationView();
});