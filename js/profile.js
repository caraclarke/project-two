var sa = 'https://shielded-ocean-1335.herokuapp.com';
var test = 'http://localhost:3000';

var showProfileInformationTemplate = function (data) {
  var profileShowTemplate = Handlebars.compile($("#profile-show-template").html());
  $("#show-profile").html(profileShowTemplate(data.profile));
};

var showProfile = function() {
  $.ajax({
    url: sa + "/profiles/" + simpleStorage.get('profileId'),
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    showProfileInformationTemplate(data);
    console.log(data);
  }).fail(function(data) {
    console.error(data);
  });
};

// not currently using
var populateUpdateForm = function (data) {
  if (data) {
    //$('#profile-update-template').data('id', data.id);
    $('#given_name').val(data.given_name);
    $('#surname').val(data.surname);
    $('#location').val(data.location);
    $('#gender').val(data.gender);
    $('#about_me').val(data.about_me);
    // $('').append('<img src="' + data.profile_picture + '" alt="Profile Picture">'  );
  };
}

$(function() {
  'use strict';

  // Profiles

  showProfile();

  var showEditProfileForm = function (context) {
    var profileUpdateTemplate = Handlebars.compile($('#profile-update-template').html());
    $("#update-profile").html(profileUpdateTemplate(context.profile));
  };

  var hideEditProfileForm = function () {
    $("#update-profile").hide();
  };

  $('#show-profile').on('click', '#profile-update', function(data) {
    $.ajax({
      url: sa + '/profiles/' + simpleStorage.get('profileId')
    }).done(function(data) {
      // populateUpdateForm(data);
      showEditProfileForm(data);
    });
  });

  // $('#form').populate({first_name:'Dave',last_name:'Stewart'})
  // {name:value, array:[value, value, value], object:{name:value}}

  $("#update-profile").on('click', '#profile-submit-update', function(event) {
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
   }).done(function(data, textStatus, jqxhr) {
     var profileShowTemplate = Handlebars.compile($("#profile-show-template").html());
      $("#show-profile").html(profileShowTemplate(data.profile));
      hideEditProfileForm();
   }).fail(function(jqxhr, textStatus, errorThrown) {
     console.error(errorThrown);
   });
  }); // end update

  $("#show-profile").on('click', '#profile-destroy', function(data) {
    $.ajax({
      url: sa + '/users/' + simpleStorage.get('userId'),
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
    }).done(function(data) {
      console.log('user deleted');
    }).fail(function(data) {
      console.error(data);
    });
  });

  // End profiles

}); // end function
