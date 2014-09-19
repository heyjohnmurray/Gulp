<?php
if(defined('INTERNAL_ADDRESS') && INTERNAL_ADDRESS && $_GET['forceExternal'] != 1) {
	
		echo "\n<!-- INTERNAL_ADDRESS -->\n";
		echo RV_OnlineSearch_Analytics_Google_Tracker::render_async_debug_library();
		
} else {
	
	// Global skip on internal traffic (unless ?forceExternal=1)
	if($_GET['forceExternal'] == 1) {
		echo "\n<!-- Faking EXTERNAL -->\n";
	}
	
	if(in_array($_SESSION['Marketing']['ChannelID'], array(5, 13))) { 
		// GA Pixel
		$GA = new RV_OnlineSearch_Analytics_Google_Tracker($GLOBALS['siteParams']->AnalyticsNumber_GA);
		$GA->mode_async(true);
		
		// GA Custom Data Object
		$GACustom = new RV_OnlineSearch_Analytics_Google_CustomData();
		$GACustom->push('V', $_SESSION['Tracker']->visitId, RV_OnlineSearch_Analytics_Google_CustomData::SCOPE_SESSION);
		$GACustom->push('MC', $_SESSION['Marketing']['MarketingCodeID'], RV_OnlineSearch_Analytics_Google_CustomData::SCOPE_SESSION);
		$GACustom->push('LP', RV_LandingPage::get_lpid(), RV_OnlineSearch_Analytics_Google_CustomData::SCOPE_SESSION);
		$GACustom->push('P', $_SESSION['Tracker']->pageId, RV_OnlineSearch_Analytics_Google_CustomData::SCOPE_PAGE);
		
		$GA->ga_set_custom_data_obj($GACustom);
		$GA->ga_set_site_speed_sample_rate(50);
		$GA->ga_track_page_view(true);
		
		echo $GA->render_tracking();
	}

	//universal analytics
		echo <<<END
				<!-- Google Analytics -->
				<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
				(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');				

				hQ.on("initialized", function(){
					var hud = halcyon.cookie.getHUD();
					
					ga('create', 'UA-20269609-1', {					
					  'clientId': hud.i					
					});
					ga('set', 'dimension1', hud.i);
					ga('send', 'pageview');
				  
				});
				
				</script>
				<!-- End Google Analytics -->
END;
	
}
