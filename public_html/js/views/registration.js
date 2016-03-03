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
            return this; // TODO"
        },
        show: function () {
            $('#page').html(this.render().$el);// TODO
            this.$('.main').fadeIn("slow");
        },
        send: function(event){
            event.preventDefault();
            this.$('.error').fadeOut('fast');

            if(!this.$name.val() || !this.$pass.val() || !this.$passRepeat.val() || !this.$email){
                this.$('.error').fadeIn('fast');
                this.$('.error').html('<strong>Ой! </strong>Выделенные поля не заполнены!');
                return;
            }
            var email = this.$email.val();
            var name = this.$name.val();
            var pass = this.$pass.val();
            var passRepeat = this.$passRepeat.val();

            if(pass.length < 8 ){
                this.$error.fadeIn('fast');
                this.$error.html('<strong>Ой! </strong> Пароль состоит менее чем из 8 символов!');
                this.$pass.parent('.form-group').addClass('has-error');
                return;
            }
            if(!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)){
                this.$error.fadeIn('fast');
                this.$error.html('<strong>Ой! </strong> E-mail введён некорректно!');
                return;
            }
            if(!/\w/.test(pass) || !/\w/.test(name)){
                this.$error.fadeIn('fast');
                this.$error.html('<strong>Ой! </strong> Пароль и Логин может содержать символы: A-Z a-z 0-9!');
                return;
            }

            if(pass = passRepeat){
                this.$error.fadeIn('fast');
                this.$error.html('<strong>Ой! </strong> Пароли не совпадают');
                return;
            }


        }

    });

    return new registrationView();
});