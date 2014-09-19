/*
 * hailo event tracking
 *
 * @desc: allows to add hailo tracking by simply adding data-attributes to HTML tags along with a 'js-hailo' class
 *
 * IMPORTANT: going forward we only want to pass back the hailo event so that we can integrate with SSAS. only use
 *            the hailo label and hailo value is absolutely necessary.
 *
 * @use: <a href="#" data-hailo-event="click - proactive chat" class="js-hailo">Chat Now</a>
 *
 * @author: Jake Plummer
 * @since: 4/29/2014
 */
function fnHailoEventTracking(e) {
	
	var self = $(this); // DOM element that contains 'js-hailo' class
	var event = self.data('hailo-event');
	var label = self.data('hailo-label'); // going forward, only use this if we HAVE TO -- returns null if not specified (thats ok)
	var value = self.data('hailo-value'); // going forward, only use this if we HAVE TO -- returns null if not specified (thats ok)
	var params = {};
	params[label] = value;
	
	// if they are submitting a form, we need a callback
	if ( event === 'submit' ) {
		
		e.preventDefault();
		
		var form = $(this).parent('form'); // submit button must be direct child of <form>, if not update this line
		
		hQ.store(event, params);
		
		// hack for FF since it won't fire in a callback function of hQ.store();
		setTimeout(function() {
		
			form.submit();
			
		}, 50);

	}
	else {
	
		// do default hQ.store
		hQ.store(event, params);
	}
}