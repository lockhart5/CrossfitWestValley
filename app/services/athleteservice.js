app.factory('AthleteService', function ($http, $q, $firebase) {


    var ref = new Firebase('https://shining-fire-723.firebaseio.com/').child('athletes');
    //var athletes = $firebase(ref.child('athletes'));
    //var athletes = $firebase(ref).$asArray();;
    //var athlete = new AthleteModel();

    ref.on('child_added', function (snap) {
        //console.log('added', snap.name());
    })

    var saveAthlete = function (athlete) {
        var email = athlete.emailaddress.replace(".", ",");
        var ath = new AthleteModel(email, athlete);
        ref.child(email).set(ath);
        return true;
    }

    var getAllAthletes = function () {
        return $firebase(ref).$asArray();
    }

    var getAthlete = function (emailaddress) {
        var ath;
        ref.child(escapeEmail(emailaddress)).once('value', function (snap) {
            if (snap.val() === null) {
                return null;
            } else {
                ath = snap.val();
            }
        });
        return ath;
    }


    function escapeEmail(email) {
        return (email || '').replace('.', ',');
    }

    function unescapeEmail(email) {
        return (email || '').replace(',', '.');
    }

    function show(snap) {
        var obj = snap.val();
        toastr.info(obj ? JSON.stringify(obj, null, 2).firstname : 'not found');
    }

    return {
        saveAthlete: saveAthlete,
        getAthlete : getAthlete,
        //athletes: athletes,
        getAllAthletes : getAllAthletes
    };
});