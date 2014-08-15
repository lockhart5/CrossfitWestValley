app.factory('SchemaService', function ($http, $q, $firebase) {


    var ref = new Firebase('https://shining-fire-723.firebaseio.com/').child('index');
    //var athletes = $firebase(ref.child('athletes'));
    var index = $firebase(ref);
    var saveIndex = function (key, id) {
        var indexkey = { key: key, value: id };
        this.index.$add(indexkey);
        return true;
    }

    return {
        saveIndex: saveIndex
    };
});