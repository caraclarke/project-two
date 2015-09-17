var test = 'http://localhost:3000';

var indexProjects = function (data) {
  var projectIndexTemplate = Handlebars.compile($('#project-index-template').html());
  $("#index-project").html(projectIndexTemplate(data));
};

var indexProjectRequest = function () {
  // $("#project-index").on('load', function(event) { // loading all projects on page load
    // event.preventDefault();
     $.ajax({
      url: test + "/projects",
    }).done(function(data) {
      // var projectIndexTemplate = Handlebars.compile($('#project-index-template').html());
      // $("#index-project").html(projectIndexTemplate(data));
      indexProjects(data);
      }).fail(function(data) {
      console.error(data);
    });
  // }); // end project index
};

$(function() {
  'use strict';
  var sa = 'https://shielded-ocean-1335.herokuapp.com';
  // var test = 'http://localhost:3000';

// Projects
  indexProjectRequest();

$("#project-create").on('click', function(e) {
  var projectReader = new FileReader();
  projectReader.onload = function(event) {
    var project_picture = event.target.result;
      $.ajax({
      url: test + '/projects',
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
    }).done(function(data) {
      window.location.href = 'project-two/project-two/project_list.html';
    }).fail(function(data) {
      console.error(data);
    });
  };
  projectReader.readAsDataURL($('#project-picture')[0].files[0]);
}); // end project create

var getProject = function (element) {
  return $.ajax({
    url: test + "/projects/" + element.data('id'),
  });
};

var showProject = function (context) {
  $('#index-project').hide();
  var projectShowTemplate = Handlebars.compile($('#project-show-template').html());
  $("#show-project").html(projectShowTemplate(context.project));
};

$("#index-project").on('click', 'h4 > a', function(event) {
  event.preventDefault();
  getProject($(this)).done(function(data) {
    showProject(data);
  }).fail(function(data) {
    console.error(data);
  }); // showing a specific project from the index list
}); // end project show

var showEditProjectForm = function (context) {
  var projectUpdateTemplate = Handlebars.compile($('#project-update-template').html());
  $("#update-project").html(projectUpdateTemplate(context.project));
};

var hideEditProjectForm = function () {
  $("#update-project").hide();
};

$("#show-project").on('click', '#project-edit', function(data) {
  getProject($(this)).done(function(data) {
    showEditProjectForm(data);
 });
}); // end project edit show

$("#update-project").on('click', '#project-update', function() {
  $.ajax({
    url: test + '/projects/' + $(this).data('id'),
    method: 'PATCH',
    headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
    },
    data: {
      project: {
        title: $('#project-title').val(),
        instructions: $('#project-instructions').val(),
        profile_id: simpleStorage.get('profileId')
     }
   }
 }).done(function(data, textStatus, jqxhr) {
    showProject(data);
    hideEditProjectForm();
 }).fail(function(jqxhr, textStatus, errorThrown) {
    console.error(errorThrown);
 });
}); // end project update

$("#show-project").on('click', '#project-destroy', function(data) {
  $.ajax({
    url: test + '/projects/' + $(this).data('id'),
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    alert("Project deleted");
    window.location.href = 'project-two/project_list.html';

  }).fail(function(data) {
    console.error(data);
  });
});

// end Projects
}); // end page
