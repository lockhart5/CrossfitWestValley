app.factory('crudGridDataFactory', ['$firebase', function ($firebase) {
    
    //return function (table) {
        var ref = new Firebase('https://shining-fire-723.firebaseio.com/');
        //return $resource('api/' + type + '/:id', { id: '@id' }, { 'update': { method: 'PUT' } }, { 'query': { method: 'GET', isArray: false } });
        var getAll = function (table) {
            return $firebase(ref.child(table)).$asArray();
        }
        
        var save = function (table, object) {
            //return ref.child(table).set(object);
            $firebase(ref.child(table)).$save(object);
        }

        var remove = function(table, objectid){
            $firebase(ref.child(table)).$remove(objectid);
        }

        var get = function (table, objectid) {
            var obj;
            ref.child(table).child(objectid).once('value', function (snap) {
                if (snap.val() === null) {
                    return null;
                } else {
                    obj = snap.val();
                }
            });
            return obj;
        }

        return {
            get: get,
            getAll: getAll,
            save: save,
            remove : remove
        }

        fu
}]);