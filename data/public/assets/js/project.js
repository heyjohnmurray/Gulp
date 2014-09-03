// for some reason this block doesn't work when it's inside the jquery wrapper
// example of page transition on form submit :: http://api.jquerymobile.com/pagecontainer/#method-change
$('#signup').live('pagecreate',function(event) { 
	$('.js-signup-form').submit( function (e) {
		
		$.post('/login/', $('.js-signup-form').serialize(), function(data) {
	        
           	$(':mobile-pagecontainer').pagecontainer('change', '#slide1', {
				transition: 'slide'
				, changeHash: false // this lets you disable has appearance in the browser window
			});
        })
	        .fail(function(data) {
	                console.log('Error: ' + data);
	        });
		
		e.preventDefault();
	});
});

$(function() {
	//full screen auto transitioning
	$('.js-start-auto-slides').on('tap', function(e){
		var nextSlide = $(e.target).data('next-slide');
		var secondSlide = $(e.target).data('second-slide');

		setTimeout(function(){
			$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
				transition: 'slide'
			});

			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', secondSlide, {
					transition: 'slide'
				});
			}, 3000);
		}, 3000);
	});

	//same as above but add more time to show videos
	$('.js-start-video-slide').on('tap', function(e){
		var nextSlide = $(e.target).data('next-slide');
		var secondSlide = $(e.target).data('second-slide');

		setTimeout(function(){
			$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
				transition: 'slide'
			});

			setTimeout(function(){
				$(':mobile-pagecontainer').pagecontainer('change', secondSlide, {
					transition: 'slide'
				});
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

		if (choice != null) {
			$(e.target).addClass('answer-confirm');
			$(e.target).parent().parent().siblings().addClass('is-faded');
		}
		e.preventDefault();

		$(':mobile-pagecontainer').pagecontainer('change', nextSlide, {
			transition: 'slide'
		});
	});
//close jquery	
});