// example of page transition on form submit :: http://api.jquerymobile.com/pagecontainer/#method-change
$(function() {

	// Check to see if they are logged in and if they are switch to the slide they last saw
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
			postVotes();
		}
		
	});

	// Post the votes
	function postVotes(){
		var choices = getCookie('choices'); 
		var userID = getCookie('userID'); 

		clearCookies();

		$.post('/vote/', {'PollData': choices, 'UserID': userID}, function(data) {
			$('#score').html(data.pollResult);
		})
			.fail(function() {
	        	$('#score').html('0');
	        })
	        .always(function() {
			    $(':mobile-pagecontainer').pagecontainer('change', '#slide49', {
					transition: 'slide'
				});
			});
	}

	// keep track of what slide they are on
	function setSlideCookie(slide) {
		document.cookie = "currentSlide=" + slide + ";";
	}

	// keep track of our user
	function setUserCookie(userID) {
		document.cookie = "userID=" + userID + ";";
	}

	// clear everything
	function clearCookies() {
		document.cookie = "currentSlide=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = "userID=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		document.cookie = "choices=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
	}

	// are they logged in and switch to their last slide
	function isLoggedIn() {
		var userID = getCookie('userID');

		if(userID){
			var slide = getCookie('currentSlide');

			if(slide){
				autoSlide(slide);
			}
		}
	}

	// keep track of their selected votes
	function setChoice(choice) {
		var choices = getCookie('choices');
		var choiceObj = {};

		if(choices) {
			choiceObj = JSON.parse(choices);
		}

		var choiceSplit = choice.toString().split(".");
		choiceObj[choiceSplit[0]] = choiceSplit[1];

		document.cookie = "choices=" + JSON.stringify(choiceObj) + ";";

	}

	// get cookies --- yummy
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

	// slide to the last slide they were on and if it was and if it was an auto slide set the timeout
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
			// two slides to auto slide
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
			// only one slide to auto slide
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