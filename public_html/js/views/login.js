define([
    'backbone',
    'tmpl/login',
    'models/session'
], function(
    Backbone,
    tmpl,
    session
){

    var loginView = Backbone.View.extend({

        template: tmpl,
        events: {
            "submit .login_form": "send"
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
            this.$error = this.$('.js-error');
            this.$errorAlert = this.$('.js-error-alert');
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
            if(event){
        	   event.preventDefault();
            }
            this.$error.fadeOut('fast');
            this.$errorAlert.fadeOut('fast');
            var name = this.$name.val();
            var pass = this.$pass.val();
            var valid = session.ValidLogin(name,pass);

        	if(valid == 'success'){
                session.login(name,pass)
        		.fail(
                    function(event) {
                            console.log(event.status);
                            var error = ".js-"+event.status + "-status"
                            console.log(error);
                            $(".js-error").fadeIn("fast");
                            $(error).fadeIn("fast");
                })
                .done(
                    function() {
                        Backbone.history.navigate('', { trigger: true })
                });
                
            }
            else {
                this.$error.fadeIn('fast');
                this.$(this.generateClass(valid)).fadeIn('fast');
            }

            

        }

    });

    return new loginView();
});