// @codekit-prepend plugins/placeholder.min.js
// @codekit-prepend plugins/jquery.active-menu.min.js
// @codekit-prepend functions.js 

// wait for DOM to finish loading
$(document).on('ready', function() {

	$(".disabled").on("click", function(e){
		e.preventDefault();
	});

	$("#js-serviceable-form").submit(function(){		
		$("#form-submit-msg").modal();
	});

	// hailo event tracking
	$('.js-hailo').on('click', fnHailoEventTracking);
	
	// active menu
	$('.nav-primary').setActiveMenu({
		
		parent: false // true by default. this will place the 'active' class on the <a> tag instead of the <li>
	});
	
});