$(function() {
  'use strict';
  var sa = 'https://shielded-ocean-1335.herokuapp.com';
	var test = 'http://localhost:3000';

  $('#contact-submit').on('click', function(event) {
    alert("Thank you for contacting us! We'll be in touch shortly.");
    window.location.href = '/index.html';
  });

}); // end function
