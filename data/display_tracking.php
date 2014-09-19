<?
    require_once('define.php');
	get_id_action();

	use RVLibraries\Monetization\Event;

	if($action == 'ad_listing' && isset($_SESSION['Tracker'])) {
		$visitID = $_SESSION['Tracker']->visitId;

		// Quote Lab = 17
		// Brokersweb = 23
		// Right now only QuoteLab but if we switch back to brokersweb
		if(isset($_POST['SubscriberID']) && in_array($_POST['SubscriberID'], array(17,23))){
			$subscriberID = (int) $_POST['SubscriberID'];
			
		} else {
			$subscriberID = 17;
		}

		try {
			$EventClient = new Event;
			$EventClient->createVisitAdDisplay($visitID, $subscriberID, 1);
		} catch(Exception $e) {
			mail('bbachtel@redventures.com', 'Error logging Ad Display event: ' . $visitID, 'ERROR : ' . var_export($e,true));
		}
	}