<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->

<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex,nofollow,noodp" />
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- CSS -->
<link href="/assets/css/compiled.css" rel="stylesheet">
<link href="/assets/css/jquery.mobile-1.4.3.css" rel="stylesheet">
<link href="/assets/css/jquery.mobile.structure-1.4.3.css" rel="stylesheet">
<link href="/assets/css/jquery.mobile.theme-1.4.3.css" rel="stylesheet">

<!-- JAVASCRIPT -->
<script src="/global_js/jQuery/jquery-1.8.3.min.js"></script>
<script src="/assets/js/jquery.mobile-1.4.3.js"></script>

<script type="text/javascript">
	$('#signup').live('pagecreate',function(event) { 
		$('.signup-form').submit( function (e) {
			$(':mobile-pagecontainer').pagecontainer('change', '#questions', {
		        transition: 'slide',
		        changeHash: false
		    });
		    e.preventDefault();
		});
	});
</script>
</head>
