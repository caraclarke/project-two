$(function() {
  'use strict';
  var sa = 'https://shielded-ocean-1335.herokuapp.com';
  var test = 'http://localhost:3000';

  $("#show-login-modal").on('click', function() {
    $("#login-modal").modal();
  });

  $("#show-register-modal").on('click', function() {
    $("#register-modal").modal();
  });

// User

$('#register-button').on('click', function(e) {
  // var reader = new FileReader();
  // reader.onload = function(event) {
  //   var picture = event.target.result;
    $.ajax({
      url: sa + '/users',
       contentType: 'application/json',
       processData: false,
       data: JSON.stringify({
         credentials: {
           email: $('#register-email').val(),
           password: $('#register-password').val(),
           password_confirmation: $('#register-confirm-password').val(),
           surname: $('#register-surname').val(),
           given_name: $('#register-given_name').val(),
           location: $('#register-location').val(),
           about_me: $('#register-about_me').val(),
           gender: $('#register-gender').val(),
           // profile_picture: picture
         }
       }),
       dataType: 'json',
       method: 'POST'
     }).done(function(data, textStatus, jqxhr) {
       simpleStorage.set('token', data.token);
       $("#register-modal").modal('hide');
       $("#login-modal").modal('show');
       // window.location.href = '/login_page.html';
     }).fail(function(jqxhr, textStatus, errorThrown) {
       console.log('registration failed');
     });
   //};
    // reader.readAsDataURL($('#picture')[0].files[0]);
  }); // end register

$('#login-button').on('click', function(e) {
  e.preventDefault();
  $.ajax({
    url: sa + '/login',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
     credentials: {
       email: $('#login-email').val(),
       password: $('#login-password').val()
     }
   }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr) {
    $("#login-modal").modal('hide');
    simpleStorage.set('token', data.token);
    simpleStorage.set('userId', data.user_id);
    simpleStorage.set('profileId', data.profile_id);
  }).fail(function(jqxhr, textStatus, errorThrown) {
    alert("Email or Password incorrect, please try again.");
  });
}); // end login

// only for login page.html

$("#update").on('click', function() {
  $.ajax({
    url: sa + '/users/' + $("#user-id").val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    },
    data: {
      credentials: {
       email: $('#email').val(),
       username: $('#username').val(),
       password: $('#password').val(),
       password_confirmation: $('#password').val()
     }
   }
 }).done(function(data, textStatus, jqxhr) {
   window.location.href = '/profile.html';
 }).fail(function(jqxhr, textStatus, errorThrown) {
   $('#result').val('update failed');
 });
}); // end update

$("#destroy").on('click', function() {
  $.ajax({
    url: sa + '/users/' + $("#user-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    console.log("Deleted user!");
  }).fail(function(data) {
    console.error(data);
  });
}); // end destroy

// End users

}); // end function
