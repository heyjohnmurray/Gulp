$(function() {
	// Turn the form into a tabbed form for JS-able users
	$("#stepOne").addClass("tab");
	$("#stepTwo").addClass("tab");
	$("#stepThree").addClass("tab");
	
	if($("#stepTwoLink").hasClass("activeTab")) {
		$(".tab").hide();
		$("#stepTwo").show();
		$("#stepOneLink").removeClass("activeTab");
		$("#stepTwoLink").attr("href", "#");
	} else {
		$(".tab").hide();
		$("#stepOne").show();
		$("#stepTwoLink").removeClass("activeTab");
		$("#stepOneLink").addClass("activeTab");
		$("#stepOneLink").attr("href", "#");
	}
	
	// This doesn't handle flow control/tab blocking... using the above which allows non-JS users to interact with the site.
	// var tabAnchor = $("#tab-nav a");
	// $(tabAnchor).each(function(index){
	// 	$(this).click(function(e){
	// 		//remove pre-existing activeTab instances
	// 		$("#tab-nav a").removeClass("activeTab");
	// 		//adds new activeTab instance to current selection
	// 		$(this).addClass("activeTab");
	// 		var theRel = $(this).attr("rel");			
	// 		//hide all the tabs
	// 		$(".tab").hide();
	// 		//then show the div content that matches the tab anchor rel you clicked 
	// 		$("#" + theRel).show();
	// 		e.preventDefault();
	// 	})
	// });
	
	// Select Fields
	$('select.inputfield').change(function(){
		var optionColor = $('.inputfield').css('color');
		$(this).css('color', optionColor);
	});
});