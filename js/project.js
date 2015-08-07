$(function() {
  'use strict';
  var sa = 'http://localhost:3000';

  // Projects

$("#project-create").on('click', function(e){
  console.log(simpleStorage.get('token'));
  var projectReader = new FileReader();
  projectReader.onload = function(event) {
    var project_picture = event.target.result;
      $.ajax({
      url: sa + '/projects',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
      data: {
        project: {
          title: $('#project-title').val(),
          instructions: $('#project-instructions').val(),
          profile_id: simpleStorage.get('profileId'),
          project_image: project_picture
        }
      }
    }).done(function(data){
      console.log("Created project!");
    }).fail(function(data){
      console.error(data);
    });
  }
  projectReader.readAsDataURL($('#project-picture')[0].files[0]);
}); // end project create

var getProject = function (element) {
  return $.ajax({
    url: sa + "/projects/" + element.data('id'),
  })
};

var showProject = function (context) {
  $('#index-project').hide();
  var projectShowTemplate = Handlebars.compile($('#project-show-template').html());
  $("#show-project").html(projectShowTemplate(context.project));
};

$("#index-project").on('click', 'h4 > a', function(event){
  event.preventDefault();
  getProject($(this)).done(function(data){
    showProject(data);
  }).fail(function(data){
    console.error(data);
  });
}); // end project show

$("#project-index").on('click', function(event){
  event.preventDefault();
   $.ajax({
    url: sa + "/projects",
  }).done(function(data){
    var projectIndexTemplate = Handlebars.compile($('#project-index-template').html());
    $("#index-project").html(projectIndexTemplate(data));
    console.log(data);
    }).fail(function(data){
    console.error(data);
  });
}); // end project index

var showEditProjectForm = function (context) {
  var projectUpdateTemplate = Handlebars.compile($('#project-update-template').html());
  $("#update-project").html(projectUpdateTemplate(context.project));
};

var hideEditProjectForm = function () {
  $("#update-project").hide();
};

$("#show-project").on('click', '#project-edit', function(data){
  getProject($(this)).done(function(data) {
    showEditProjectForm(data);
 });
}); // end project edit show

$("#update-project").on('click', '#project-update', function(){
  $.ajax({
    url: sa + '/projects/' + $(this).data('id'),
    method: 'PATCH',
    headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
    },
    data: {
      project: {
        title: $('#project-title').val(),
        instructions: $('#project-instructions').val(),
        profile_id: simpleStorage.get('profile_id')
     }
   }
 }).done(function(data, textStatus, jqxhr){
    showProject(data);
    hideEditProjectForm();
 }).fail(function(jqxhr, textStatus, errorThrown){
    console.error(errorThrown);
 });
}); // end project update

$("#show-project").on('click', '#project-destroy', function(data){
  $.ajax({
    url: sa + '/projects/' + $(this).data('id'),
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    alert("Project deleted");
    window.location.href = '/project_list.html';

  }).fail(function(data){
    console.error(data);
  });
});

// end Projects

// ruby -run -e httpd . -p 5000

}); // end page
