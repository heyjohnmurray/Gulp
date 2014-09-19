<?php

	/**
	 * AJAX Backend to return Polk vehicle data
	 * @author jfreeman 7/12/2012
	 */

	require_once('define.php');
	

	switch($_GET['type']) {
		
		case 'make':
			$dataArray = DB_HomeInsurance_Vehicle_VINPrefix::fetch_make_by_year($_GET['year'])->get_column_values('MakeName');
			break;
		case 'model':
			$dataArray = DB_HomeInsurance_Vehicle_VINPrefix::fetch_model_by_make_year($_GET['make'],$_GET['year'])->get_column_values('BaseModel');
			break;
		case 'body':
			$dataArray = DB_HomeInsurance_Vehicle_VINPrefix::fetch_submodel_by_model_make_year($_GET['model'],$_GET['make'],$_GET['year'])->get_column_values('SeriesName');
			break;
		case 'submodel':
			$dataArray = DB_HomeInsurance_Vehicle_VINPrefix::fetch_submodel_by_make_year($_GET['make'],$_GET['year'])->get_column_values('SeriesName');
			break;
	}

	$json = json_encode($dataArray);	
	echo $json;
