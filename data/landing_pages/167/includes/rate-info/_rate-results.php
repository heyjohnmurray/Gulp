<div class="rate-results">

	<div class="container">
		<div class="row">
			<div class="box-full">
				<div class="content-box">
					<? if($_SESSION['Contact']['Status'] == "Success" && $_SESSION['Contact']['Premium'] != 0): ?> 
						<? include_once( RV_LandingPage::find('includes/rate-info/_quote-results.php') ); ?>
					<? else: ?>
						<div class="quote-lab-listings">
							<!-- /.quote-lab-listings -->
							<? if($_SESSION['Contact']['Status'] == 'Ineligible' || $_SESSION['Contact']['Status'] == 'Ineligible2'): ?>
								<div class="banner">
									<p>Click an Offer Below to Get Quotes in Minutes!</p>
								</div>
							<? else: ?>
								<div class="banner">
									<p>Please call us at <span class="h-phone"><?=$sitePhone?></span> to get your quotes now! Or check out an offer below and we'll contact you shortly.</p>
								</div>
							<? endif; ?>
							<script type="text/javascript">
								var MediaAlphaExchange = {
								    "type": "ad_unit",
								    "placement_id": "vjM2gsYX9ObruryN-P29qIHJd3yF2w",
								    "version": "17",
								    "sub_1": "167",
								    "data": { 
								        "zip": "<?=(isset($_SESSION['Contact']['ZipCode'])?$_SESSION['Contact']['ZipCode']:'')?>"
								    }
								};
							</script>
	<? include_once(RV_Web_SharedInclude::include_shared_file( 'homeinsurance', 'quotelab_publisher_listing.php') ); ?>
							<script src="//insurance.mediaalpha.com/js/serve.js"></script>
							<script src="/js/display_tracking.js"></script>
						</div>
						<!-- /.quote-lab-listings -->
					<? endif; ?>
				</div>
				<!-- /.content-box -->
			</div>
			<!-- /.box-full -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /.container -->

</div>
<!-- /.rate-results -->