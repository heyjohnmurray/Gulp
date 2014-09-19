jQuery(document).ready(function ($) {
	if (typeof MediaAlphaExchange__success == 'function') {
		$.ajax({
			url: '/display_tracking.php',
			type: 'POST',
			data: {
				action: 'A7dSvNGk3vNp%2FFotZJXLKw%3D%3D',
				SubscriberID: '17'
			},
			success: function() {
				//console.log('Success');
			},
			error: function(jqXHR) {
				//console.log('Fail');
			}
		});
		/*$('.max-ad-listings tr').on('click', function(e){
			
		});*/
	}
});
