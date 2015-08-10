$(function() {
  'use strict'
  var sa = 'https://shielded-ocean-1335.herokuapp.com';

  // Profiles

  var showEditProfileForm = function (context) {
    var profileUpdateTemplate = Handlebars.compile($('#profile-update-template').html());
    $("#update-profile").html(profileUpdateTemplate(context.profile));
  };

  var hideEditProfileForm = function () {
    $("#update-profile").hide();
  };

  $('#show-profile').on('click', '#profile-update', function(data){
    $.ajax({
      url: sa + '/profiles/' + simpleStorage.get('profileId')
    }).done(function(data){
      showEditProfileForm(data);
    });
  });

  $("#update-profile").on('click', '#profile-submit-update' ,function(event){
    $.ajax({
      url: sa + '/profiles/' + simpleStorage.get('profileId'),
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
      data: {
        profile: {
         surname: $('#surname').val(),
         given_name: $('#given_name').val(),
         location: $('#location').val(),
         about_me: $('#about_me').val(),
         gender: $('#gender').val(),
         profile_id: simpleStorage.get('profileId'),
         user_id: simpleStorage.get('userId')
       }
     }
   }).done(function(data, textStatus, jqxhr){
    console.log(data);
     var profileShowTemplate = Handlebars.compile($("#profile-show-template").html());
      $("#show-profile").html(profileShowTemplate(data.profile));
     hideEditProfileForm();
   }).fail(function(jqxhr, textStatus, errorThrown){
     console.error(errorThrown);
   });
  }); // end update

  $('#profile-show').on('click', function(event){
    event.preventDefault();
    $.ajax({
      url: sa + "/profiles/" + simpleStorage.get('profileId'),
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
        },
    }).done(function(data){
      var profileShowTemplate = Handlebars.compile($("#profile-show-template").html());
      $("#show-profile").html(profileShowTemplate(data.profile));
   }).fail(function(data){
    console.error(data);
    // window.location.href = '/login_page.html';
  });
  });

  $("#show-profile").on('click', '#profile-destroy', function(data){
    $.ajax({
      url: sa + '/users/' + simpleStorage.get('userId'),
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
    }).done(function(data){
      console.log('user deleted');
    }).fail(function(data){
      console.error(data);
    });
  });

  // End profiles

}); // end function

// // ruby -run -e httpd . -p 5000
