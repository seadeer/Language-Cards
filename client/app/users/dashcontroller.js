//DASHBOARD - here is where info about users and cards comes together. It is part of the user app but separated from the core user functions.
userApp.controller('dashController', function(userFactory, cardFactory, $location){
    var that = this;
    this.error = '';
    this.user = userFactory.user();

    //get 5 of user's recent cards
    this.indexOwnCards = function(){}

    //get 5 of other users' cards
    //can we do this and indexUser in a single query???
    this.indexOtherCards = function(){}

    this.create = function(){}


})
