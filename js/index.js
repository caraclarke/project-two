$(function() {
  'use strict';
  var sa = 'http://localhost:3000';

  $('#contact-submit').on('click', function(event){
    alert("Thank you for contacting us! We'll be in touch shortly.")
    window.location.href = '/index.html';
  });

}); // end function
