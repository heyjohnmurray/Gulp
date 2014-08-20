<!DOCTYPE html>
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex,nofollow,noodp" />
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- CSS -->
<link href="/assets/css/compiled.css" rel="stylesheet">
<!-- <link href="/assets/css/jquery.mobile-1.4.3.css" rel="stylesheet"> -->
<link href="/assets/css/jquery.mobile.structure-1.4.3.css" rel="stylesheet">
<!-- <link href="/assets/css/jquery.mobile.theme-1.4.3.css" rel="stylesheet"> -->

<!-- JAVASCRIPT -->
<script src="/global_js/jQuery/jquery-1.8.3.min.js"></script>
<script src="/assets/js/jquery.mobile-1.4.3.js"></script>

<script>
	//example of page transition on form submit :: http://api.jquerymobile.com/pagecontainer/#method-change
	$('#signup').live('pagecreate',function(event) { 
		$('.signup-form').submit( function (e) {
			$(':mobile-pagecontainer').pagecontainer('change', '#slide1', {
		        transition: 'slide'
		    });
		    e.preventDefault();
		});
	});

	$(function() {
		//orientation warning
		$( window ).on( "orientationchange", function( event ) {
			if (event.orientation === 'portrait') {
				alert('please view this app in landscape mode');
			};
		});

		//vote choice logic
		var choice = null;

		$('.js-vote-choice').on('tap', function(e){
			var choice = $(e.target).data('choice');
			
			if (choice != null) {
				$(e.target).addClass('answer-confirm');
				$(e.target).parent().parent().siblings().addClass('is-faded');
				//console.log(choice);
			}
			e.preventDefault(); //to allow it to choose the next slide, the default will have to be returned after tap somehow. i just don't know how.
		});

		//$('.js-vote-choice').unbind('tap');
	//close jquery	
	});
</script>
</head>
