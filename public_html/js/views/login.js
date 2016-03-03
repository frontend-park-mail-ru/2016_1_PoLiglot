define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){

    var loginView = Backbone.View.extend({

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
            this.$error = this.$('.error');
            this.$errorAlert = this.$(".error-alert");
            this.$emptyField = this.$(".empty-field");
            return this; // TODO
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
        },
        hide: function () {
            $('#page').html(this.render().$el);
            this.$('.main-menu__button').hide("slow");
            this.$('.main').fadeOut("slow"); // TODO
        },
        send: function(event){
        	event.preventDefault();
            this.$errorAlert.fadeOut('fast');
        	this.$error.fadeOut('fast');

        	if(!this.$name.val() || !this.$pass.val()){
        		this.$error.fadeIn('fast');
                this.$emptyField.fadeIn('fast');
                
                return;
            }

            var name = this.$name.val();
            var pass = this.$pass.val();

        }

    });

    return new loginView();
});