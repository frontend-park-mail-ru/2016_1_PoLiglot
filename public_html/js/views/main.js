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
        initialize: function() {
            this.render();
        },
        render: function () {
            this.$el.html(tmpl());
        },
        notGuest: function(){
            console.log("noguest");
            $('.js-guest').hide();
            $('.js-noguest').show();

        },
        guest:function(){
            console.log("guest");
            $('.js-noguest').hide();
            $('.js-guest').show();
            
            
        },
        checkLogin: function(){
            this.off("OK");
            this.off("NO")
            this.on("OK", function() { 
                this.notGuest();
            }.bind(this));
            this.on("NO", function() { 
                this.guest();
            }.bind(this));
            session.isLoggedIn()
            .done(function(){
                console.log("ok");
                this.trigger('OK');
            }.bind(this))
            .fail(function(){
                console.log("no");
                this.trigger('NO');
            }.bind(this))
        },
        show: function () {
            console.log("show");
            this.trigger("show",this);
            this.$el.show();
            this.checkLogin();
            
            //$('#page').html(this.render().$el);
            this.$('.main').fadeIn("fast");
            
        },
        hide: function () {
            this.$el.hide();
        },
        quit: function(event) {
            if(event){
               event.preventDefault();
            }
            session.logout();
            console.log("выход");
            
            Backbone.history.navigate('ll',true);
        },
    });

    return new mainView();
});