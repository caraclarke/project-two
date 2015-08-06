$(function() {
  'use strict';
  var sa = 'http://localhost:3000';

  // Projects

$("#project-create").on('click', function(e){
  var projectReader = new FileReader();
  projectReader.onload = function(event) {
    var project_picture = event.target.result;
      $.ajax({
      url: sa + '/projects',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + $('#token').val()
      },
      data: {
        credentials: {
          title: $('#project-title').val(),
          instructions: $('#project-instructions').val(),
          profile_id: $('profile_id').val(),
          project_image: project_picture
        }
      }
    }).done(function(data){
      console.log("Created project!");
      $('#result').val(JSON.stringify(data)); // update to display in handlebars
    }).fail(function(data){
      console.error(data);
    });
  }
  projectReader.readAsDataURL($('#project-picture')[0].files[0]);
}); // end project create

var projectDisplayTemplate = Handlebars.compile($('#project').html());

$("#project-show").on('click', function(event){
  $.ajax({ // change this button
    url: sa + "/projects/" + $("#project-id").val(),
  }).done(function(movie){
    $("#show-project").html(projectDisplayTemplate({
      project: response.project
    }));
  }).fail(function(data){
    console.error(data);
  });
}); // end project show

$("#project-index").on('click', function(event){
  $.ajax({
    url: sa + "/projects",
  }).done(function(data){
    $("#index-project").html(projectDisplayTemplate({
      project: data
    }));
    });
  }).fail(function(data){
    console.error(data);
  });
}); // end project index

$("#project-update").on('click', function(){
  $.ajax({
    url: sa + '/projects/' + $("#project-id").val(),
    method: 'PATCH',
    headers: {
        Authorization: 'Token token=' + $('#token').val()
    }, // authenticate creator
    data: {
      credentials: {
        title: $('#project-title').val(),
        instructions: $('#project-instructions').val(),
        profile_id: $('profile_id').val()
     }
   }
 }).done(function(data, textStatus, jqxhr){
   $("#show-project").html(projectDisplayTemplate({
      project: response.project
    })); // may not work?
 }).fail(function(jqxhr, textStatus, errorThrown){
      console.error(errorThrown);
 });
}); // end project update

$("#project-destroy").on('click', function(){
  $.ajax({
    url: sa + '/projects/' + $("#project-id").val(),
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + $('#token').val()
    }, // authenticate creator not just logged in
  }).done(function(data){
    console.log("Deleted project!");
  }).fail(function(data){
    console.error(data);
  });
}); // end project destroy

// end Projects

// headers: { Authorization: 'Token token=' + $('#token').val(cbb4ebd15c6f75836bb09584f9903e02) }
// ruby -run -e httpd . -p 5000

}); // end page
