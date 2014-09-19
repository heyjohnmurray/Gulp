<?php

	/**
	 * AJAX Backend that returns rate report data
	 * @author bbachtel 2014-03-17
	 */

	require_once('define.php');
	get_id_action();
	
	if($action == 'quarterly'){

		$RateReport = new HI_Web_RateReport();
		$RateReport->set_quarterly();
		$MapData = $RateReport->fetch_data();

	} else {
		
		$RateReport = new HI_Web_RateReport();
		$MapData = $RateReport->fetch_data();
		
	}

	$dataArray = array();

	$dateFormat = $MapData[0]->DateFormat;
	
	foreach($MapData AS $Row){

		$color =  'FFCC00';
		$rate = $Row->Rate;
		if($action == 'quarterly'){
			$comment = "<div><font size='18px;'>$$rate</font><font size='14px;'> - $dateFormat <br/>average quarterly<br/> homeowners insurance premium<br/></font></div>";
		} else {
			$comment = "<div><font size='18px;'>$$rate</font><font size='14px;'> - $dateFormat <br/>average three month<br/> homeowners insurance premium<br/></font></div>";
		}

		if ($rate >= '1100' ) { $color = 'FF0000';}
		if ($rate >= '900' & $rate <= '1099' ) { $color = 'FF9900';}
		if ($rate >='700' & $rate <='899' ) { $color = 'FFFF00';}
		if ($rate >='500' & $rate <='699' ) { $color = '00B050';}
		if ($rate >='300' & $rate <='499') { $color = '92D050';}
		if ($rate <='299') { $color = 'EFEFEF';}
		
		if($rate == '0' || $rate == ''){
			$comment = "<div><font size='12px;'> Rates currently not available in $Row->State</font><BR></div>";
		}

		$dataArray['st'.$Row->MapID]['id'] = $Row->MapID;
		$dataArray['st'.$Row->MapID]['name'] = $Row->State;
		$dataArray['st'.$Row->MapID]['shortname'] = $Row->Abbr;	
		$dataArray['st'.$Row->MapID]['link'] = "/local/".$Row->Url."/home-insurance-quotes.php";	
		$dataArray['st'.$Row->MapID]['comment'] = $comment;
		$dataArray['st'.$Row->MapID]['color_map'] = "#".$color;
		$dataArray['st'.$Row->MapID]['color_map_over'] = "#".$color;

	}

	$json = json_encode(array('MapData' => $dataArray, 'DateFormat' => $dateFormat ));	
	echo $json;