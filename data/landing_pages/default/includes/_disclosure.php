<div class="tcpa">
	<?
		$replacement = array("SiteName" => $siteParams->SiteName); 
		$Disclosure = RV_SalesOps_Consent_Client_Lead::get_client_by_siteid($siteParams->SiteID);
		$disclosureText = $Disclosure->get_disclosure_text();
		echo $disclosureText;
		echo $Disclosure->get_disclosure_form_fields();
	?>
</div>