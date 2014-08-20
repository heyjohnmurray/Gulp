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
<!-- <link href="/assets/css/jquery.mobile.custom.structure.min.css" rel="stylesheet"> -->
<!-- <link href="/assets/css/jquery.mobile.custom.theme.min.css" rel="stylesheet"> -->
<!-- <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.css" /> -->

<!-- JAVASCRIPT -->
<!-- <script src="/global_js/jQuery/jquery-1.8.3.min.js"></script> -->
<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<script type="text/javascript" src="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js"></script>

<script type="text/javascript">
	$('#signup').live('pagecreate',function(event) { 
		$('.signup-form').submit( function (e) {
			e.preventDefault();
			$.mobile.changePage('#questions');
		});
	});
</script>
</head>
