app.factory("User", ["$firebase", function ($firebase) {
    return function (emailaddress) {
        // create a reference to the user's profile
        var ref = new Firebase('https://shining-fire-723.firebaseio.com/athletes/').child(emailaddress);
        // return it as a synchronized object
        return $firebase(ref).$asObject();

    }
}]);