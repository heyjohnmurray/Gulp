<form action="/zip_lookup_post_hero.php" method="post" name="zip-lookup" class="zip-lookup">	
	<?
		if( !empty($_SESSION['form_rmsg']) ) {
	?>
			<div class="error error-zip" class="contact_form_error">
	<?
				print $_SESSION['form_rmsg'];
				unset($_SESSION['form_rmsg']);
				unset($_SESSION['bad_fields']);
	?>
			</div>
	<?
		}
	?>
	
	<input type="hidden" name="action" value="<?=r3e('check_zip')?>" />
	<input type="hidden" name="from" value="<?=r3e($_SERVER['REQUEST_URI'])?>" />
	<input type="hidden" name="to" value="<?=r3e('step2.html')?>" />
	<input type="hidden" name="type" value="<?=r3e('home_form')?>" />

	<input type="text" name="zip" class="zip" placeholder="ZIP Code" value="<?= $zip ? $zip : ''; ?>" />
	<input type="submit" name="submit" alt="Free Home Insurance Quotes!" class="submit hpSubmit" value="Get Quotes!">
</form>