<form class="form-contact" name="form-contact" action="/contact_form_post2.php" method="post">

	<?
		if( !empty($_SESSION['form_rmsg']) ) {
	?>
			<div class="errors">
	<?
				print $_SESSION['form_rmsg'];
				unset($_SESSION['form_rmsg']);
				unset($_SESSION['bad_fields']);
	?>
			</div>
	<?
		}
	?> 
	<input type="hidden" name="action" value="<?=r3e('create_lead')?>" />
	<input type="hidden" name="ref" value="<?=r3e($_SERVER['REQUEST_URI'])?>" />
	<input type="hidden" name="PageID" value="<?=RV_WebTools::set_pageid_form_value($_SESSION['Tracker']->pageId)?>" />
	
	<input type="text" name="FirstName" class="FirstName" value="<?= isset($_SESSION['ContactArray']['FirstName']) ? $_SESSION['ContactArray']['FirstName'] : null; ?>" placeholder="First Name" />
	
	<input type="text" name="LastName" class="LastName" value="<?= isset($_SESSION['ContactArray']['LastName']) ? $_SESSION['ContactArray']['LastName'] : null; ?>" placeholder="Last Name" />
	
	<input type="text" name="Email" class="Email" value="<?= isset($_SESSION['ContactArray']['Email']) ? $_SESSION['ContactArray']['Email'] : null; ?>" placeholder="Email" />
	
	<input type="text" name="Phone1" class="Phone1" value="<?= isset($_SESSION['ContactArray']['Phone1']) ? $_SESSION['ContactArray']['Phone1'] : null; ?>" placeholder="Phone" />

	<input type="text" name="Phone2" class="Phone2" value="<?= isset($_SESSION['ContactArray']['Phone2']) ? $_SESSION['ContactArray']['Phone2'] : null; ?>" placeholder="Alt Phone" />
	
	<input type="text" name="ZipCode" class="ZipCode" value="<?= isset($_SESSION['ContactArray']['ZipCode']) ? $_SESSION['ContactArray']['ZipCode'] : null; ?>" placeholder="Zip Code" />
	
	<?
		/**
		 * this is for TCPA consent, it will echo out 2 hidden input fields and the disclosure text
		 *
		 * NOTE: this will print out the disclosure as HTML text, there are instances where you may need it as an image.
		 * if so, this is done a little differently. if you arent familiar with how to do that, there is an example on
		 * fios.verizon.com, or just ask Jake P.
		 *
		 */
		echo RV_SalesOps_Consent_Client_Lead::get_client_by_siteid($siteParams->SiteID)->get_lead_disclosure(); 
	?>
	
	<input type="submit" value="" class="submit" />
	
</form>
<!-- END .contact_form -->
