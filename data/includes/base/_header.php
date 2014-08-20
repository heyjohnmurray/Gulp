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

<script type="text/javascript">
	//orientation warning
	$( window ).on( "orientationchange", function( event ) {
		if (event.orientation === 'portrait') {
			alert('please view this app in landscape mode');
		};
	});

	//example of page transition on form submit :: http://api.jquerymobile.com/pagecontainer/#method-change
	$('#signup').live('pagecreate',function(event) { 
		$('.signup-form').submit( function (e) {
			$(':mobile-pagecontainer').pagecontainer('change', '#slide1', {
		        transition: 'slide'
		    });
		    e.preventDefault();
		});
	});

	//vote choice logic
	$('.js-vote-choice').on('tap', function(e){
		alert('tap');
		e.preventDefault();
	})

</script>
</head>
