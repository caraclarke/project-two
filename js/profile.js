$(function()) {

  // Profiles

  $("#profile-update").on('click', function(){
    $.ajax({
      url: '/profiles/' + $("#profile_id").val(),
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
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

  var profileShowTemplate = Handlebars.compile($("#profile").html());

  $("#profile-show").on('click', function(event){
    $.ajax({
      url: "/profiles/" + $('#profile_id').val(),
    }).done(function(response){
     $("#show-profile").html(profileShowTemplate({
      profile: response.profile
    }));
   }).fail(function(data){
    console.error(data);
  });
  });

  $("#profile-destroy").on('click', function(){
    $.ajax({
      url: '/profiles/' + $("#profile_id").val(),
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      },
    }).done(function(data){
      console.log("Deleted profile!");
    }).fail(function(data){
      console.error(data);
    });
  }); // end destroy

  // End profiles

}); // end function

// headers: { Authorization: 'Token token=' + $('#token').val(cbb4ebd15c6f75836bb09584f9903e02) }
// ruby -run -e httpd . -p 5000
