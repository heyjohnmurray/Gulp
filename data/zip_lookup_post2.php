<?
    require_once('define.php');
	get_id_action();
	
	// strip tags from all form vars submitted
	foreach( $_POST as $field => $value ) {
		$_POST[$field] = strip_tags($_POST[$field]);
	}

	//$_SESSION['Contact'] = $_POST;

	if ($action == 'check_zip') {
        $returnLoc = trim(r3d($_POST['to']));
        $fromLoc = trim(r3d($_POST['from']));
        $zip = preg_replace('/[^\d]/', '', (string) $_POST['zip']);
        $yearBuilt = (integer) $_POST['yearBuilt'];
        $errMsg = 'ZIP must be supplied';
                
        if (empty($zip)) {
            $_SESSION['zip_bad_fields'][] = 'zip';
            $_SESSION['zip_rmsg'] = $errMsg;
            header('Location: ' . $fromLoc);
            exit;
        } else{
            $_SESSION['Contact']['Zip'] = $zip;
        }

        if (empty($yearBuilt)) {
            $yearBuilt = date('Y')-1;
        }
        
        // Redirect if the lead is not serviceable
        try {
        	$isServiceable = HI_ServiceableHome::is_home_serviceable($zip, $yearBuilt, REFERAL_PARTNERS_SERVICEABLE);
        	$CompanyInfo = DB_Homeinsurance_Web_Unserviceablezips::fetch_one_where('ZipCode = '. r3a($zip), 'webslave');
            if(!$isServiceable || $CompanyInfo) {
        		header("Location: /rd-quotes/home.php?zip=" . r3e($zip) . "&year=" . r3e($yearBuilt));
        		die();
        	}
        } catch(Exception $e) {}
        
        $_SESSION['Contact']['IsServiceable'] = $isServiceable;
        // Log off our serviceability event
        try {
            $hud = $_COOKIE['hud'];
            $TheHud = new RV_Hailo_Hive_Hud($hud);
            $TrackEventHelper = new RV_Hailo_Helper_TrackEvent();
            $TrackEventHelper->set_token_from_hud($TheHud);
            $TrackEventHelper->track_generic_event('serviceability', array('result' => (string) $isServiceable, 'zip' => $zip, 'yearBuilt' => $yearBuilt));
        } catch (Exception $e) {}
        try {
            $ZipResult = DB_Common_Corporate_ZipCodes::fetch_one_cached($zip);
        } catch (Exception $e) {}
        // Make sure we have a record back from the table
        // TODO: Is this what we should do?
        if(!$ZipResult) {
            if ($isAjax) {
                die(json_encode(array(
                    'error' => 'We could not find your zip code'
                )));
            } else {
                header('Location: ' . $fromLoc);
                exit;
            }
        } else {
        	// More data in the session
        	$_SESSION['Contact']['City'] = $ZipResult->City;
        	$_SESSION['Contact']['State'] = $ZipResult->State;
            if($yearBuilt > 0){
                $_SESSION['Contact']['YearBuilt'] = $yearBuilt;
            }
        }
        
        // Set our return array
        $retArray = array(
            'zip' => $zip,
            'yearBuilt' => $yearBuilt,
            'city' => $ZipResult->City,
            'state' => $ZipResult->State
        );
        if (!$isServiceable) {
            $redirectUrl = HI_ServiceableHome::redirect_url($zip, $yearBuilt) . '&source=quotes.homeownersinsurance.com';
            unset($_SESSION['Contact']);
            if ($isAjax) {
                $retArray['isServiceable'] = '0';
                $retArray['redirectUrl'] = $redirectUrl;
                die(json_encode($retArray));
            } else {
                header('Location: ' . $redirectUrl);
                exit;
            }
        }
        if ($isAjax) {
            $retArray['isServiceable'] = '1';
            die(json_encode($retArray));
        } else {
            header('Location: ' . $returnLoc);
            exit;
        }
    }
	