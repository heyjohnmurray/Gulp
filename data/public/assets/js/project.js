// example of page transition on form submit :: http://api.jquerymobile.com/pagecontainer/#method-change
$(function() {

	isLoggedIn();

	$('.js-signup-form').submit( function (e) {
		
		$.post('/login/', $('.js-signup-form').serialize(), function(data) {

			if(data.userID){
		        setUserCookie(data.userID);
				setSlideCookie('#slide1');

	           	$(':mobile-pagecontainer').pagecontainer('change', '#slide1', {
					transition: 'slide'
					, changeHash: false // this lets you disable has appearance in the browser window
				});
           	}
        })
	        .fail(function(data) {
	        		var response = $.parseJSON(data.responseText);

	                console.log('Error: ' + response.message);

	                if(response.error && response.detail && response.error == "Validation Error"){
	                	for (var key in response.detail) {
	                		$('input[name="'+key+'"]').addClass('error');
	                	}
	                	$('.invalid-inputs').html('Please fix the highlighted fields');
	                }
	        });
		
		e.preventDefault();
	});

	//full screen auto transitioning
	$('.js-start-auto-slides').on('tap', function(e){
		setSlideCookie($(e.target).attr('href'));
		var nextSlide = $(e.target).data('next-slide');
		var secondSlide = $(e.target).data('second-slide');

		setTimeout(function(){
			$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
				transition: 'slide'
			});
			setSlideCookie(nextSlide);
			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', secondSlide, {
					transition: 'slide'
				});
				setSlideCookie(secondSlide);
			}, 3000);
		}, 3000);
	});

	//same as above but add more time to show videos
	$('.js-start-video-slide').on('tap', function(e){
		setSlideCookie($(e.target).attr('href'));
		var nextSlide = $(e.target).data('next-slide');
		var secondSlide = $(e.target).data('second-slide');

		setTimeout(function(){
			$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
				transition: 'slide'
			});
			setSlideCookie(nextSlide);
			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', secondSlide, {
					transition: 'slide'
				});
				setSlideCookie(secondSlide);
			}, 3000);
		}, 5000);
	});

	// orientation warning
	$( window ).on( "orientationchange", function( event ) {
		if (event.orientation === 'portrait') {
			alert('please view this app in landscape mode');
		};
	});

	// vote choice logic 
	var choice = null;

	// vote choice logic for desktop slides
	$('.js-vote-choice').on('tap', function(e){
		var choice = $(e.target).data('choice');
		var nextSlide = $(e.target).data('next-slide');

		setSlideCookie(nextSlide);

		if (choice != null) {
			setChoice(choice);
			$(e.target).addClass('answer-confirm');
			$(e.target).parent().parent().siblings().addClass('is-faded');
		}
		e.preventDefault();

		if(nextSlide !== "#slide49"){
			$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
				transition: 'slide'
			});
		} else {

		}
		
	});

	function setSlideCookie(slide) {
		document.cookie = "currentSlide=" + slide + ";";
	}

	function setUserCookie(userID) {
		document.cookie = "userID=" + userID + ";";
	}

	function clearCookies() {
		document.cookie = "currentSlide=;userID=;";
	}

	function isLoggedIn() {
		var userID = getCookie('userID');

		if(userID){
			var slide = getCookie('currentSlide');

			if(slide){
				autoSlide(slide);
			}
		}
	}

	function setChoice(choice) {
		var choices = getCookie('choices');
		var choiceArray = [];

		if(choices) {
			choiceArray = JSON.parse(choices);
		}

		choice = choice.split(".");
		choiceArray[choice[0]] = choice[1];

		document.cookie = "choices=" + JSON.stringify(choiceArray) + ";";

	}

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	function autoSlide(slide) {

		var nextSlide = false
		,secondSlide = false;

		$(':mobile-pagecontainer').pagecontainer('change', slide, {
			transition: 'slide'
			, changeHash: false // this lets you disable has appearance in the browser window
		});

		// see if this is an auto slide
		var classes = $(slide).attr('class');
		
		if(classes && classes.indexOf("js-full-first") !== -1){
			// need to auto slide 2 slides
			var nextSlide = $(slide + " + div").attr('id');
			var secondSlide = $("#" + nextSlide + " + div").attr('id');
		} else if(classes && classes.indexOf("js-full-second") !== -1){
			// else we only need to autoslide one
			var nextSlide = $(slide + " + div").attr('id');
		}

		if(secondSlide){

			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', '#' + nextSlide, {
					transition: 'slide'
				});
				setSlideCookie('#' + nextSlide);

					setTimeout(function(){
						$(':mobile-pagecontainer').pagecontainer('change', '#' + secondSlide, {
							transition: 'slide'
						});
						setSlideCookie('#' + secondSlide);
					}, 3000);
			}, 3000);
		} else if(nextSlide){
			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', '#' + nextSlide, {
					transition: 'slide'
				});
				setSlideCookie('#' + nextSlide);
			}, 3000);
		}
		
	}
//close jquery	
});