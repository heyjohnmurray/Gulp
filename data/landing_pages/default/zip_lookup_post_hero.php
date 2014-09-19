<?
    require_once('define.php');
	get_id_action();
	
	// strip tags from all form vars submitted
	foreach( $_POST as $field => $value ) {
		$_POST[$field] = strip_tags($_POST[$field]);
	}

	//$_SESSION['Contact'] = $_POST;
    $type = trim(r3d($_POST['type']));
	if ($action == 'check_zip' && $type == 'home_form') {
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
            $_SESSION['Contact']['ZipCode'] = $zip;
        }

        if (empty($yearBuilt)) {
            $yearBuilt = date('Y')-1;
        }

        try {
            $ZipResult = DB_Common_Corporate_ZipCodes::fetch_one_default_cached($zip);
        } catch (Exception $e) {}
        // Make sure we have a record back from the table
        // TODO: Is this what we should do?
        if(!$ZipResult) {
            if ($isAjax) {
                die(json_encode(array(
                    'error' => 'We could not find your zip code'
                )));
            } else {
                unset($_SESSION['Contact']);
                $_SESSION['zip_bad_fields'][] = 'zip';
                $_SESSION['zip_rmsg'] = $errMsg;
                header('Location: ' . $fromLoc);
                exit;
            }
        } else {
            // More data in the session
            $_SESSION['Contact']['City'] = $ZipResult->City;
            $_SESSION['Contact']['State'] = $ZipResult->State;
        }

        $_SESSION['Contact']['Type'] = $type;

        $retArray = array(
            'zip' => $zip,
            'yearBuilt' => $yearBuilt,
            'city' => $ZipResult->City,
            'state' => $ZipResult->State
        );

        try {
            $isServiceable = HI_ServiceableHome::is_home_serviceable($zip, $yearBuilt, REFERAL_PARTNERS_SERVICEABLE);
            $CompanyInfo = DB_Homeinsurance_Web_Unserviceablezips::fetch_one_where('ZipCode = '. r3a($zip), 'webslave');
            $_SESSION['Contact']['IsServiceable'] = $isServiceable;
            if(!$isServiceable || $CompanyInfo) {
                $redirectUrl = HI_ServiceableHome::redirect_url(r3e($zip), r3e($yearBuilt)) . '&source=quotes.homeownersinsurance.com';
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
        } catch(Exception $e) {}

        $ServiceableCarriers = DB_HomeInsurance_Service_Effective::get_carriers_by_zipcode_policytype( $zip, HI_Constants_PolicyType::HOME); 

        $_SESSION['SafecoForm'] = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::SAFECO);

        if ($isAjax) {
            $retArray['isServiceable'] = '1';
            die(json_encode($retArray));
        } else {
            header('Location: ' . $returnLoc);
            exit;
        }
   
    } else if($action == 'check_zip' && $type == 'auto_form'){
        $returnLoc = trim(r3d($_POST['to']));
        $fromLoc = trim(r3d($_POST['from']));
        $zip = preg_replace('/[^\d]/', '', (string) $_POST['zip']);
        $errMsg = 'ZIP must be supplied';
                
        if (empty($zip)) {
            $_SESSION['zip_bad_fields'][] = 'zip';
            $_SESSION['zip_rmsg'] = $errMsg;
            header('Location: ' . $fromLoc);
            exit;
        } else{
            $_SESSION['Contact']['Zip'] = $zip;
            $_SESSION['Contact']['ZipCode'] = $zip;
        }

        if (empty($yearBuilt)) {
            $yearBuilt = date('Y')-1;
        }

        try {
            $isServiceable = HI_ServiceableHome::is_home_serviceable($zip, $yearBuilt, REFERAL_PARTNERS_SERVICEABLE);
            $CompanyInfo = DB_Homeinsurance_Web_Unserviceablezips::fetch_one_where('ZipCode = '. r3a($zip), 'webslave');
            $_SESSION['Contact']['IsServiceable'] = $isServiceable;
            if(!$isServiceable || $CompanyInfo) {
                $redirectUrl = HI_ServiceableHome::redirect_url(r3e($zip), r3e($yearBuilt)) . '&source=quotes.homeownersinsurance.com';
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
        } catch(Exception $e) {}

        $ServiceableCarriers = DB_HomeInsurance_Service_Effective::get_carriers_by_zipcode_policytype( $zip, HI_Constants_PolicyType::HOME); 

        $_SESSION['SafecoForm'] = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::SAFECO);

        $_SESSION['Contact']['Type'] = $type;

        //Match Zip Code with State Abbreviation and State Full Name
        $query = "
            SELECT
                *
            FROM
                HomeInsurance_Web.ZipCodeRanges ZCR
                LEFT JOIN HomeInsurance_Web.SureHitsAutoStates SHAS USING (Abbr)
            WHERE
                1
                AND " . r3a($zip) . " BETWEEN `First` AND `Last`
        ";
        $ZipCodeRange = DB_Generic::fetch_one($query, 'webslave');


        if ($_SERVER['HTTP_HOST'] == 'homeinsurance.com') {
            if(in_array($ZipCodeRange->Abbr, $autoRaterStatesArray)) {
                header('Location: ' . $returnLoc);
                exit;
            }
        } else {
            header('Location: ' . $returnLoc);
            exit;
        }

        //If zip code is blank or invalid send to "help" landing page
        $Zip = DB_HomeInsurance_Web_ZipCodeCensus::fetch_one_where("ZipCode = " . r3a($zip), 'webslave');

        if(!$Zip) {
            unset($_SESSION['Contact']);
            header('Location: ' . $fromLoc);
            exit;
        }

        //If zip equals a zip that ASI Wants than send to home_1.php
        $AsiZip = DB_HomeInsurance_Web_ASIWantedZips::fetch_one_where("Zip = " . r3a($zip), 'webslave');
        if($AsiZip) {
            header("Location: /auto-insurance/qn-rate/rate-quotes-auto-insurance.php?state={$Zip->State}&state_name={$Zip->StateFullName}&zip=$zip");
            exit;
        }

        //If zip equals a Travelers excluded zip than send to SureHits
        $TravlersZip = DB_HomeInsurance_Web_TravelersExZips::fetch_one_where("ZipCode = " . r3a($zip), 'webslave');

        if($TravlersZip) {
            header("Location: /auto-insurance/qn-rate/rate-quotes-auto-insurance_5.php?state={$Zip->State}&state_name={$Zip->StateFullName}&zip=$zip");
            exit;
        } else {
            header("Location: /auto-insurance/qn-rate/rate-quotes-auto-insurance.php?state={$Zip->State}&state_name={$Zip->StateFullName}&zip=$zip");
            exit;
        }
    }
	