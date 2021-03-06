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
      Authorization: 'Token token=' + simpleStorage.get('profileId')
    },
  }).done(function(data) {
    showProfileInformationTemplate(data);
  }).fail(function(data) {
    console.error(data);
  });
};

var populateUpdateForm = function(data) {
  if (data) {
    $('#given_name').val(data.given_name);
    $('#surname').val(data.surname);
    $('#location').val(data.location);
    $('#gender').val(data.gender);
    $('#about_me').val(data.about_me);
    // $('').append('<img src="' + data.profile_picture + '" alt="Profile Picture">'  );
  };
}

var populateProjectUpdateForm = function(data) {
  if (data) {
    $('#project-title').val(data.title);
    $('#project-instructions').val(data.instructions);
  };
}

Handlebars.registerHelper('grouped_each', function(every, context, options) {
  var out = "", subcontext = [], i;
  if (context && context.length > 0) {
    for (i = 0; i < context.length; i++) {
      if (i > 0 && i % every === 0) {
        out += options.fn(subcontext);
        subcontext = [];
      }
      subcontext.push(context[i]);
    }
    out += options.fn(subcontext);
  }
  return out;
});

var loadProjectsOnProfile = function() {
  $.ajax({
    url: sa + '/profiles/' + simpleStorage.get('profileId') + '/projects',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    indexProjects(data);
  }).fail(function(data) {
    console.error(data);
  });
};

var indexProjects = function (data) {
  var projectIndexTemplate = Handlebars.compile($('#project-index-template').html());
  $("#index-project").html(projectIndexTemplate(data));
};


$(function() {
  'use strict';

  // Profiles

  showProfile();
  loadProjectsOnProfile();

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
      showEditProfileForm(data);
      populateUpdateForm(data.profile);
    });
  });

  $("#update-profile").on('click', '#profile-submit-update', function(event) {
    $.ajax({
      url: sa + '/profiles/' + simpleStorage.get('profileId'),
      method: 'POST',
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

  // project for display on profiles

var getProject = function (element) {
  return $.ajax({
    url: sa + "/projects/" + element.data('id'),
  });
};

var showProject = function (context) {
  $('#index-project').hide();
  var projectShowTemplate = Handlebars.compile($('#project-show-template').html());
  $("#show-project").html(projectShowTemplate(context.project));
};

$("#index-project").on('click', 'h3 > a', function(event) {
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
  populateProjectUpdateForm(data.project);
 });
}); // end project edit show

$("#update-project").on('click', '#project-update', function() {
  $.ajax({
    url: sa + '/projects/' + $(this).data('id'),
    method: 'POST',
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
    url: sa + '/projects/' + $(this).data('id'),
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
    },
  }).done(function(data) {
    alert("Project deleted");
    window.location.href = 'profile.html';
  }).fail(function(data) {
    console.error(data);
  });
});

}); // end function
