var sa = 'https://shielded-ocean-1335.herokuapp.com';
var test = 'http://localhost:3000';

var navbarTemplate = function (data) {
	var navbarShowTemplate = Handlebars.compile($("#navbar-template").html());
	$("#navbar").html(navbarShowTemplate(data));
};

var showNavbar = function() {
  $.ajax({
    url: './js/navbar.hbs',
		// cache: true
  }).done(function(data) {
    // var profileShowTemplate = Handlebars.compile($("#profile-show-template").html());
    // $("#show-profile").html(profileShowTemplate(data.profile));
    navbarTemplate(data);
  }).fail(function(data) {
    console.error(data);
    // window.location.href = '/login_page.html';
  });
};

$(function() {
  'use strict';

	showNavbar();

}); // end function
