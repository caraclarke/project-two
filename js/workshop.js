$(function() {
  'use strict';
  var sa = 'https://shielded-ocean-1335.herokuapp.com';
  var test = 'http://localhost:3000';

// Workshops

$("#workshop-create").on('click', function(e) {
    $.ajax({
      url: sa + '/workshops',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
      data: {
        credentials: {
          title: $('#workshop-title').val(),
          location: $('#workshop-location').val(),
          about: $('#workshop-about').val(),
          contact: $('#workshop-contact').val(),
          repeats: $('#workshop-repeats').val()
        }
      }
    }).done(function(data) {
      console.log("Created workshop!");
      $('#result').val(JSON.stringify(data)); // update to display in handlebars
    }).fail(function(data) {
      console.error(data);
    });
  projectReader.readAsDataURL($('#project-picture')[0].files[0]);
}); // end workshop create

$("#workshop-show").on('click', function(event) {
  $.ajax({ // change this button
    url: sa + "/workshops/" + $("#workshop-id").val(),
  }).done(function(workshop) {
    var workshopShowTemplate = Handlebars.compile($('#workshop-show-template').html());
    var newHTML = workshopShowTemplate;
    $("#show-workshop").html(newHTML);
    console.log(JSON.stringify(data));
  }).fail(function(data) {
    console.error(data);
  });
}); // end workshop show

$("#workshop-index").on('click', function(event) {
  $.ajax({
    url: sa + "/workshops",
  }).done(function(data) {
    var workshopIndexTemplate = Handlebars.compile($('#workshop-index-template').html());
    var newHTML = workshopIndexTemplate;
    $("#index-workshop").html(newHTML);

    console.log(JSON.stringify(data));
  });
}).fail(function(data) {
  console.error(data);
});
}); // end workshop index

$("#workshop-update").on('click', function() {
  $.ajax({
    url: sa + '/workshops/' + $("#workshop-id").val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator
    data: {
      credentials: {
        title: $('#workshop-title').val(),
        location: $('#workshop-location').val(),
        about: $('#workshop-about').val(),
        contact: $('#workshop-contact').val(),
        repeats: $('#workshop-repeats').val()
      }
    }
  }).done(function(data, textStatus, jqxhr) {
    var workshopShowTemplate = Handlebars.compile($('#workshop-show-template').html());
    var newHTML = workshopShowTemplate;
    $("#show-workshop").html(newHTML);

    console.log(JSON.stringify(data));
 }).fail(function(jqxhr, textStatus, errorThrown) {
  console.error(errorThrown);
});
}); // end workshop update

$("#workshop-destroy").on('click', function() {
  $.ajax({
    url: sa + '/workshops/' + $("#workshop-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator not just logged in
  }).done(function(data) {
    console.log("Deleted workshop!");
  }).fail(function(data) {
    console.error(data);
  });
}); // end workshop destroy

// End Workshops

// Attendances

$("#attendance-create").on('click', function(e) {
    $.ajax({
      url: sa + '/attendances',
      method: 'POST',
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      },
      data: {
        credentials: {
          title: $('#workshop-title').val(),
          date: $('#project-instructions').val(),
          user_name: $('attendance-name').val()
        }
      }
    }).done(function(data) {
      console.log("Created attendance!");
      var attendanceIndexTemplate = Handlebars.compile($('#attendance-index-template').html());
      var newHTML = attendanceIndexTemplate;
      $("#index-attendance").html(newHTML);

      console.log(JSON.stringify(data));
    }).fail(function(data) {
      console.error(data);
    });
}); // end attendance create

$("#attendance-index").on('click', function(event) {
  $.ajax({
    url: sa + "/attendances",
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function(data) {
    var attendanceIndexTemplate = Handlebars.compile($('#attendance-index-template').html());
    var newHTML = attendanceIndexTemplate;
    $("#index-attendance").html(newHTML);

    console.log(JSON.stringify(data));
  }).fail(function(data) {
    console.error(data);
  }); // end fail
}); // end attendance index

$("#attendance-update").on('click', function() {
  $.ajax({
    url: sa + '/attendances/' + $("#attendace-id").val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator
    data: {
      credentials: {
        title: $('#workshop-title').val(),
        date: $('#project-instructions').val(),
        user_name: $('attendance-name').val()
      }
    }
  }).done(function(data, textStatus, jqxhr) {
   var attendanceIndexTemplate = Handlebars.compile($('#attendance-index-template').html());
    var newHTML = attendanceIndexTemplate;
    $("#index-attendance").html(newHTML);

    console.log(JSON.stringify(data));
 }).fail(function(jqxhr, textStatus, errorThrown) {
  console.error(errorThrown);
});
}); // end attendance update

$("#attendance-destroy").on('click', function() {
  $.ajax({
    url: sa + '/attendances/' + $("#attendance-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator not just logged in
  }).done(function(data) {
    console.log("Deleted attendance!");
  }).fail(function(data) {
    console.error(data);
}); // end attendance destroy
// end Attendances

}); // end function
