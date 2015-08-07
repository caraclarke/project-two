$(function() {
  'use strict'
  var sa = 'http://localhost:3000';

  // Profiles
  $("#profile-update").on('click', function(e){
    var id = $(this).data('id');
    $.ajax({
      url: sa + '/profiles/' + id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
      data: {
        credentials: {
         surname: $('#surname').val(),
         given_name: $('#given_name').val(),
         location: $('#location').val(),
         about_me: $('#about_me').val(),
         gender: $('#gender').val(),
         profile_id: $('#profile_id').val(),
         user_id: $('#user-id').val()
       }
     }
   }).done(function(data, textStatus, jqxhr){
     $('#result').val(JSON.stringify(data));
   }).fail(function(jqxhr, textStatus, errorThrown){
     $('#result').val('profile update failed');
   });
  }); // end update

  $('#profile-index').on('click', function(e){
    $.ajax({
      url: sa + "/profiles?limit=me",
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
    }).done(function(response){
      var profileShowTemplate = Handlebars.compile($("#profile").html());
      var newHTML = profileShowTemplate({profile: response.profile});
      $("#index-profile").html(newHTML);

      console.log(response);
   }).fail(function(data){
    window.location.href = '/login_page.html';
  });
  });

  $("#profile-destroy").on('click', function(){
    $.ajax({
      url: sa + '/profiles/' + $("#profile_id").val(),
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
    }).done(function(data){
      console.log("Deleted profile!");
    }).fail(function(data){
      console.error(data);
    });
  }); // end destroy

  // End profiles

}); // end function

// // ruby -run -e httpd . -p 5000
