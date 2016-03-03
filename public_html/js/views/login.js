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
        	this.$('.error').fadeOut('fast');

        	if(!this.$name.val() || !this.$pass.val()){
        		this.$('.error').fadeIn('fast');
                this.$('.error').html('<strong>Ой!</strong>Поля логина или пороля не заполнены!');
                return;
            }

            var name = this.$name.val();
            var pass = this.$pass.val();

        }

    });

    return new loginView();
});