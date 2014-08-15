app.factory('UserService', function ($firebase) {

    ref = new Firebase("https://shining-fire-723.firebaseio.com/users"),
    auth = initAuth(ref);

    // intialize Firebase Simple Login
    function initAuth(ref) {
        return new FirebaseSimpleLogin(ref, function (err, user) {
            // if there is an error then display it 
            if (err) {
                displayError(err);
            }
            else if (user) {
                // we only want to log people in through the email/password provider
                if (user.provider !== 'password') {
                    auth.logout();
                }
                else {
                    // logged in!
                    uid = user.uid;
                    // save the user to our firebase
                    ref.child(user.uid).set({
                        id: user.id,
                        uid: user.uid,
                        email: user.email
                    });
                    toastr.success('Logged in');
                    // switch over the the user info screen
                    switchView('userInfo');
                }
            }
            else {
                // logged out!
                console.log('not logged in');
            }
        });
    }
    var createUser = function (emailaddress, password, rememeber) {
        auth.createUser(emailaddress, password, function (error, user) {
            // if there isn't an error, log the user in
            // then switch to the userInfo view
            if (!error) {
                //login(emailaddress, password, rememeber);
                
                return true;
                //switchView('userInfo');
                //ref.child(user.uid).set({
                //    displayName: user.displayName,
                //    provider: user.provider,
                //    provider_id: user.id
                //});
            } else {
                // display any errors
                displayError(error);
                return false;
            }
        });
    }

    var changePassword = function () {
        auth.changePassword(email, oldPassword, newPassword, function (error, success) {
            if (!error) {
                console.log('Password changed successfully');
                return false;
            }
            return true;
        });
    }
    
    var login = function(emailaddress, password, rememeber)
    {
        auth.login('password', {
            email: emailaddress,
            password: password,
            rememberMe: rememeber
        });
        //myRef.child('users').child(user.uid).set({
        //    displayName: user.displayName,
        //    provider: user.provider,
        //    provider_id: user.id
        //});
    }

    var logout = function()
    {
        auth.logout();
    }

    var removeUser = function () {
        auth.removeUser(email, password, function (error, success) {
            if (!error) {
                console.log('User deleted successfully');
            }
        });
    }

    var resetPassword = function () {
        auth.sendPasswordResetEmail(email, function (error, success) {
            if (!error) {
                console.log('Password reset email sent successfully');
            }
        });
    }

    function switchView(view) {
        //var $view = $("#" + view);
        //$views.removeClass('active');
        //$view.addClass('active');
        //$error.text(''); // clear error
        //$view.trigger("viewLoaded");
    }

    function displayError(error) {
        var errorMsg = '';
        switch (error.code) {
            case "INVALID_EMAIL":
                errorMsg = "You entered an invalid email";
                break;
            case "INVALID_PASSWORD":
                errorMsg = "You entered an invalid password";
                break;
            case "EMAIL_TAKEN":
                errorMsg = "The email you entered has been taken.";
                break;
            default:
                errorMsg = "We're not really sure what happened.";
                break;
        }
        toastr.error(errorMsg);
    }

    function bindUsers() {
        ref.on('child_added', function (snap) {
            console.log(snap.val());
            $userList.append("<li>" + snap.val().email + "</li>");
        });
    }

    return {
        login: login,
        logout: logout,
        createUser: createUser,
        changePasword: changePassword,
        removeUser: removeUser,
        resetPassword: resetPassword
    }

    //************** Events ********************************
    var authRef = new Firebase("https://shining-fire-723.firebaseio.com/.info/authenticated");
    authRef.on("value", function (snap) {
        if (snap.val() === true) {
            toastr.info("authenticated");
        } else {
            toastr.info("not authenticated");
        }
    });
});
