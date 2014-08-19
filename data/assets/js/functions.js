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
 * @updated: 6/4/2014 - added support for "event type"
 */
function hailoEventTracking(e) {

	var self = $(this); // DOM element that contains 'js-hailo' class
	var event = self.data('hailo-event');
	var label = self.data('hailo-label'); // going forward, only use this if we HAVE TO -- returns null if not specified (thats ok)
	var value = self.data('hailo-value'); // going forward, only use this if we HAVE TO -- returns null if not specified (thats ok)
	var params = {};
	params[label] = value;

	/*
	 * now that we are only passing back hailo-event instead of all 3 params, we need to check against
	 * event-type instead of event for things like forms, external links, etc. that need to prevent default action
	 * so that hailo has time to fire
	 */
	var eventType = self.data('hailo-event-type');

	if ( eventType === 'submit' ) {

		e.preventDefault();

		var parents = $(this).parents('form'); // grab all parents (should typically just be 1)
		var form = parents && parents[0]; // set to first parent

		hQ.store(event, params, function() {

			form.submit();
		});

	}
	else if ( eventType === 'link' ) {

		e.preventDefault();

		hQ.store(event, params, function() {

			// make sure we have an href
			if (self.attr('href')) {

				window.location = self.attr('href');
			}
		});
	}
	else {

		// do default hQ.store
		hQ.store(event, params);
	}
}