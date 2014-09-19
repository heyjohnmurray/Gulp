<? 
	//this is the quote rate returned by home no touch
	
	$zip = $_SESSION['Contact']['ZipCode'];
	$ZipResult = DB_Common_Corporate_ZipCodes::fetch_one_default_cached($zip);
	//Since most everything is Safeco only putting in array if it isn't and default to Safeco
	/*** NOTE: This was added because it was last minute and page was live and per Alan wanted this featured functionality, if this becomes a hit consider an alternative for doing this. ***/
	$ServiceableCarriers = DB_HomeInsurance_Service_Effective::get_carriers_by_zipcode_policytype( $zip, HI_Constants_PolicyType::HOME);

	$Safeco = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::SAFECO);
	$Travelers = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::TRAVELERS);
	//$Foremost = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::FOREMOST);
	$Hartford = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::HARTFORD);
	$ASI = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::ASI);
	$Liberty = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::LIBERTYMUTUAL);
	$Metlife = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::METLIFE);
	$Progressive = $ServiceableCarriers->get_one_where('CarrierID', HI_Constants_Carrier::PROGRESSIVE);
?>

<div class="banner">
	<p>Call <span class="h-phone"><?=$sitePhone?></span> to speak to an agent about additional discounts!</p>
</div>

<h2>Carriers Available in <?= $zip ?></h2>


<section id="content">	
	<div class="results-topbar">
		<div class="box-3rd">
			<span>Available Providers</span>
		</div><!--/.box-3rd-->
		
		<div class="box-3rd">
			<span>Quote</span>
		</div><!--/.box-3rd-->
		
		<div class="box-3rd">
			<span>Get Quote</span>
		</div><!--/.box-3rd-->
	</div><!--/.results-topbar-->

	<? if($Safeco->CarrierID == HI_Constants_Carrier::SAFECO && !$Safeco->IsSuspended):?>
		<div class="result featured" >			
			<div class="box-3rd">
				<div class="most-popular">Most Popular</div>
				<img src="/images/125/logo_safeco.png" alt="Safeco Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price">
						$<?=number_format($_SESSION['Contact']['Premium']/12,2) ?> /mo.
					</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-Safeco-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">153-292</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>

	<? if($Travelers->CarrierID == HI_Constants_Carrier::TRAVELERS && !$Travelers->IsSuspended):?>
		<div class="result">
			<? if($featured == 'Travelers') : ?>
				<div class="most-popular">
					<div class="most-popular">Most Popular</div>
				</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_travelers.png" alt="Travelers Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-Travelers-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">901-302</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>
	
	<? if($Metlife->CarrierID == HI_Constants_Carrier::METLIFE && !$Metlife->IsSuspended):?>
		<div class="result">
			<? if($featured == 'Metlife') : ?>
				<div class="most-popular">Most Popular</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_metlife.png" alt="Metlife Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-MetLife-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">144-288</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>
	
	<? if($Hartford->CarrierID == HI_Constants_Carrier::HARTFORD && !$Hartford->IsSuspended):?>
		<div class="result">
			<? if($featured == 'Hartford') : ?>
				<div class="most-popular">Most Popular</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_hartford.png" alt="The Hartford Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box long-disclaimer">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-hartford-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">775-271</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>

	<? if($Liberty->CarrierID == HI_Constants_Carrier::LIBERTYMUTUAL && !$Liberty->IsSuspended):?>
		<div class="result">
			<? if($featured == 'Liberty') : ?>
				<div class="most-popular">Most Popular</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_liberty_mutual.png" alt="Liberty Mutual Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-LibertyMutual-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">819-441</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>
	
	<? if($Progressive->CarrierID == HI_Constants_Carrier::PROGRESSIVE && !$Progressive->IsSuspended):?>
		<div class="result">
			<? if($featured == 'Progressive') : ?>
				<div class="most-popular">Most Popular</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_progressive.png" alt="Progressive Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-Progressive-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">203-100</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>

	<? if($ASI->CarrierID == HI_Constants_Carrier::ASI && !$ASI->IsSuspended):?>
		<div class="result">
			<? if($featured == 'ASI') : ?>
				<div class="most-popular">Most Popular</div>
			<? endif; ?>
			<div class="box-3rd">
				<img src="/images/125/logo_asi.png" alt="ASI Insurance"/>
			</div><!--/.box-3rd-->
			
			<div class="box-3rd">
				<div class="price-box">
					<span class="price call-in">Call for pricing</span>
					<span class="disclaimer">rates available by phone only</span>
				</div><!--/.price-box-->
			</div><!--/.box-3-->
			
			<div class="box-3rd order-now">
				<span class="small">Call now:</span>
				<span class="h-phone-ASI-hoi-ps h-phone"><span class="h-phone"><?=$sitePhone?></span></span>
				<div class="small">Use promo code: <span class="promo">743-092</span></div>
			</div><!--/.box-3rd-->
		</div><!--/.result-->
	<? endif; ?>
	<p class="legal">
		<sup>*</sup>*Eligibility is subject to meeting applicable underwriting criteria. Rate is an estimate only based off information given. Subject to change.
	</p>
</section>