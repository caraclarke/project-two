$(function() {
  'use strict';
  var sa = 'https://shielded-ocean-1335.herokuapp.com/';

// User

$('#register').on('click', function(e){
  var reader = new FileReader();
  reader.onload = function(event){
    var picture = event.target.result;
    $.ajax({
      url: sa + '/users',
       contentType: 'application/json',
       processData: false,
       data: JSON.stringify({
         credentials: {
           email: $('#email').val(),
           password: $('#password').val(),
           password_confirmation: $('#password').val(),
           surname: $('#surname').val(),
           given_name: $('#given_name').val(),
           location: $('#location').val(),
           about_me: $('#about_me').val(),
           gender: $('#gender').val(),
           profile_picture: picture
         }
       }),
       dataType: 'json',
       method: 'POST'
     }).done(function(data, textStatus, jqxhr){
       simpleStorage.set('token', data.token);
       console.log("I worked");
       window.location.href = sa + '/login_page.html';
     }).fail(function(jqxhr, textStatus, errorThrown){
       console.log('registration failed');
     });
   }
    reader.readAsDataURL($('#picture')[0].files[0]);
  }); // end register

$('#login').on('click', function(e){
  e.preventDefault();
  $.ajax({
    url: sa + '/login',
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
     credentials: {
       email: $('#email').val(),
       password: $('#password').val()
     }
   }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr){
    simpleStorage.set('token', data.token);
    simpleStorage.set('userId', data.user_id);
    simpleStorage.set('profileId', data.profile_id);
    window.location.href = '/index.html';
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert("Email or Password incorrect, please try again.");
  });
}); // end login

// only for login page.html

$("#update").on('click', function(){
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
 }).done(function(data, textStatus, jqxhr){
   window.location.href = '/profile.html';
 }).fail(function(jqxhr, textStatus, errorThrown){
   $('#result').val('update failed');
 });
}); // end update

$("#destroy").on('click', function(){
  $.ajax({
    url: sa + '/users/' + $("#user-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data){
    console.log("Deleted user!");
  }).fail(function(data){
    console.error(data);
  });
}); // end destroy

// End users

}); // end function

// headers: { Authorization: 'Token token=' + $('#token').val(cbb4ebd15c6f75836bb09584f9903e02) }
// ruby -run -e httpd . -p 5000

