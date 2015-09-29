var sa = 'https://shielded-ocean-1335.herokuapp.com';
var test = 'http://localhost:3000';

var loggedIn = function() {
  if (simpleStorage.get('token')) {
    console.log(simpleStorage.get('token'));
    console.log("hey friends");
    $('#show-login-modal').addClass('hide');
    $('#show-register-modal').addClass('hide');
    $('#nav-logout').removeClass('hide');
    $('#nav-profile').removeClass('hide');
  } else {
    console.log("you yo yo");
    console.log(simpleStorage.get('token'));
    $('#nav-logout').addClass('hide');
    $('#show-login-modal').removeClass('hide');
    $('#show-register-modal').removeClass('hide');
    $('#nav-profile').addClass('hide');
  }
} // end logged in


$(function() {
  'use strict';

  loggedIn();

}); // end function
