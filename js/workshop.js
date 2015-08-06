$(function() {
  'use strict';
  var sa = 'http://localhost:3000';

// Workshops

$("#workshop-create").on('click', function(e){
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
    }).done(function(data){
      console.log("Created workshop!");
      $('#result').val(JSON.stringify(data)); // update to display in handlebars
    }).fail(function(data){
      console.error(data);
    });
  }
  projectReader.readAsDataURL($('#project-picture')[0].files[0]);
}); // end workshop create

var workshopShowTemplate = Handlebars.compile($('#workshop-show-template').html());

$("#workshop-show").on('click', function(event){
  $.ajax({ // change this button
    url: sa + "/workshops/" + $("#workshop-id").val(),
  }).done(function(workshop){
    $("#show-workshop").html(workshopShowTemplate({
      workshop: response.workshop
    }));
  }).fail(function(data){
    console.error(data);
  });
}); // end workshop show

var workshopIndexTemplate = Handlebars.compile($('#workshop-index-template').html());

$("#workshop-index").on('click', function(event){
  $.ajax({
    url: sa + "/workshops",
  }).done(function(data){
    $("#index-workshop").html(workshopIndexTemplate({
      workshop: data
    }));
  });
}).fail(function(data){
  console.error(data);
});
}); // end workshop index

$("#workshop-update").on('click', function(){
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
  }).done(function(data, textStatus, jqxhr){
   $("#show-workshop").html(workshopShowTemplate({
    workshop: response.workshop
    })); // may not work?
 }).fail(function(jqxhr, textStatus, errorThrown){
  console.error(errorThrown);
});
}); // end workshop update

$("#workshop-destroy").on('click', function(){
  $.ajax({
    url: sa + '/workshops/' + $("#workshop-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator not just logged in
  }).done(function(data){
    console.log("Deleted workshop!");
  }).fail(function(data){
    console.error(data);
  });
}); // end workshop destroy

// End Workshops

// Attendances

$("#attendance-create").on('click', function(e){
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
    }).done(function(data){
      console.log("Created attendance!");
      $("#index-project").html(projectDisplayTemplate({
        project: data
      }));
    }).fail(function(data){
      console.error(data);
    });
  }
}); // end attendance create

var attendanceIndexTemplate = Handlebars.compile($('#attendance-index-template').html());

$("#attendance-index").on('click', function(event){
  $.ajax({
    url: sa + "/attendances",
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }
  }).done(function(data){
    $("#index-attendance").html(attendanceIndexTemplate({
      attendance: data
    }));
  });
}).fail(function(data){
  console.error(data);
});
}); // end attendance index

$("#attendance-update").on('click', function(){
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
  }).done(function(data, textStatus, jqxhr){
   $("#index-attendance").html(attendanceIndexTemplate({
      attendance: data
    }));
 }).fail(function(jqxhr, textStatus, errorThrown){
  console.error(errorThrown);
});
}); // end attendance update

$("#attendance-destroy").on('click', function(){
  $.ajax({
    url: sa + '/attendances/' + $("#attendance-id").val(),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + simpleStorage.get('token')
    }, // authenticate creator not just logged in
  }).done(function(data){
    console.log("Deleted attendance!");
  }).fail(function(data){
    console.error(data);
  });
}); // end attendance destroy

// end Attendances

}); // end function

// headers: { Authorization: 'Token token=' + $('#token').val(cbb4ebd15c6f75836bb09584f9903e02) }
// ruby -run -e httpd . -p 5000
