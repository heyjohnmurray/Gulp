$(function() {

	$('#quoteMe').submit(function(e) {
		e.preventDefault();
		return false;
	});

	// Ajax serviceability check
	$('#quoteMeButton').click(function(e) {
		e.preventDefault();
		var myForm = $('#quoteMe');
		$.post(
			myForm.attr('action'),
			{
				zip: $('#zip').val(),
				yearBuilt: $('#yearBuilt').val()
			},
			function(result) {
				if (result.error) {
					alert(result.error);
					return;
				}
				if (result.isServiceable != '1') {
					window.location.href = result.redirectUrl;
					return;
				}

				// GA event
				_gaq.push(['_trackPageview', 'Lead Form Step 2']);

				// Hide all tabs, show step 2
				$('.tab').hide();
				$('#tab-nav a').removeClass('activeTab');
				$('#stepTwo').show();
				$('#stepTwoLink').addClass('activeTab');
				//$('#stepOneLink').attr('href', 'step1.php');

				// Do our form replacements
				$('#locationText').html(result.city + ', ' + result.state + ' ' + result.zip);
			},
			"json"
		).error(function() {
			// TODO: Do what??
		});
		return false;
	});

	//popup tooltip
	$(".popup").hover(function(){
		$(this).children("div").show();
		$(this).css({cursor: "pointer"});
	}, function(){
		$(this).children("div").hide();
	});
	
	//sidebar modal contact form
	$(".modal-anchor").click(function (e) {
		$(".modal-form").modal();
		e.preventDefault();
	});    
});

$(function() {
		
	// only use placeholder.js if browser doesn't support placeholder
	if (!Modernizr.input.placeholder) {
	
		// init placeholder
		Placeholder.init();
	}

	hQ.on('initialized', function() { //after hailo initializes
		var hud = halcyon.cookie.getHUD();	//get the hud
		
		if(typeof hud.n !== undefined) {	//if there's a phone in the hud
			var loc = 'tel:' + hud.n;   
		} else {
			var loc = 'tel:' + '<?=$sitePhone?>';	//if there's no phone, use sitephone
		}

		if($('html').hasClass('touch') && navigator.userAgent.match('CriOS')) {
			// for Google Chrome iOS touch devices add tel around phone numbers
			$(".h-phone").each(function () {
				// wrap phone with href="tel:" and then insert phone number
				$(this).wrapInner('<a class="phonelink" href=""></a>');
				$('.phonelink').attr('href', loc);
			});
		}
		
	});
	
});