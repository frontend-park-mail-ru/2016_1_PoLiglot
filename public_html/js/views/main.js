define([
    'backbone',
    'tmpl/main',
    'models/session'
], function(
    Backbone,
    tmpl,
    session
){

    var mainView = Backbone.View.extend({
       
        events: {
            'click .js-quit': 'quit'
        },
        template: tmpl,
        render: function () {
            this.$el.html(tmpl());
            return this;
        },
        checkLogin : function() {
            this.on("OK", function() { 
                this.notGuest();
            }.bind(this));
            this.on("NO", function() { 
                this.guest();
            }.bind(this));
            session.isLoggedIn()
            .done(function(){
                this.trigger('OK');
            }.bind(this))
            .fail(function(){
                this.trigger('NO');
            }.bind(this))
        },
        notGuest: function(){
            this.$('.js-noguest').show();
        },
        guest:function(){
            this.$('.js-guest').show();
            
        },
        show: function () {
            this.checkLogin();
            this.$el.show();
            $('#page').html(this.render().$el);
            this.$('.main').fadeIn("fast");
        },
        hide: function () {
            this.$el.hide();
        },
        quit: function(event) {
            console.log(event);
            if(event){
               event.preventDefault();
            }
            console.log("выход");
            session.logout();
            Backbone.history.navigate('login', { trigger: true })
        },
    });

    return new mainView();
});