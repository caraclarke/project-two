$(function() {
  'use strict';
  // var gameWatcher;
  var sa = 'http://localhost:3000';

// User
$('#register').on('click', function(e){
  var reader = new FileReader();
  reader.onload = function(event){
    var picture = event.target.result;
    $.ajax({
      url: sa + '/users',
       contentType: 'application/json',  // to send as JSON, must specify content type
       processData: false,
       data: JSON.stringify({
         credentials: {
           email: $('#email').val(),
           username: $('#username').val(),
           password: $('#password').val(),
           password_confirmation: $('#password').val(),
           surname: $('#surname').val(),
           given_name: $('#given_name').val(),
           location: $('#location').val(),
           about_me: $('#about_me').val(),
           gender: $('#gender').val(),
           user_id: $("#user-id").val(),
           profile_picture: picture
         }
       }),
       dataType: 'json',
       method: 'POST'
     }).done(function(data, textStatus, jqxhr){
       $('#result').val(JSON.stringify(data));
     }).fail(function(jqxhr, textStatus, errorThrown){
       $('#result').val('registration failed');
     });
   }
     reader.readAsDataURL($('#picture')[0].files[0]);
  }); // end register


$('#login').on('click', function(e){
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
 $('#token').val(data.token);
  console.log(data.token);
}).fail(function(jqxhr, textStatus, errorThrown){
 $('#result').val('login failed');
});
}); // end login

$("#update").on('click', function(){
  $.ajax({
    url: '/users/' + $("#user-id").val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
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
   $('#result').val(JSON.stringify(data));
 }).fail(function(jqxhr, textStatus, errorThrown){
   $('#result').val('update failed');
 });
}); // end update

$("#destroy").on('click', function(){
  $.ajax({
    url: '/users/' + $("#user-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
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

