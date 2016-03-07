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
            submit: "send"
        },
        initialize: function () {

        },
        render: function () {
            this.$el.html(tmpl());
            this.$name = this.$("input[name=login]");
            this.$pass = this.$("input[name=password]");
            this.$error = this.$('.js-error');
            return this;
        },
        show: function () {
            $('#page').html(this.render().$el);
            this.$('.main').fadeIn("slow");
        },
        send: function(event){
        	event.preventDefault();
            this.$error.fadeOut('fast');
            var name = this.$name.val();
            var pass = this.$pass.val();
            var valid = session.isValidLogin(name,pass);

        	if(valid == 'success'){
                session.login(name,pass);
        		$(window).ajaxError(function() {
                        $('.js-error').text("404 Not Found").show("fast");
                });
                $(window).ajaxSuccess(
                    function() {
                        Backbone.history.navigate('game', { trigger: true })
                });
                
            }
            else {
                this.$error.fadeIn('fast');
                this.$(valid).fadeIn('fast');
            }

            

        }

    });

    return new loginView();
});