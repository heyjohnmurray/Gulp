<script type="text/javascript">
	$(function() {
		<?
        	if(isset($_SESSION['bad_fields'])) {
				foreach($_SESSION['bad_fields'] as $fieldName) {
		?>
				$('input[name="<?= $fieldName ?>"]').addClass('form-error');
				$('#js-serviceable-form select[name=<?=$fieldName ?>]').addClass('form-error');
		<?		}
			} 
		?>		
	}); // Close jquery	
</script>

<?
	(isset($_SESSION['Contact']['State'])? $state = $_SESSION['Contact']['State']:$state="");
	(isset($_SESSION['Contact']['StreetAddress'])? $address = $_SESSION['Contact']['StreetAddress']:$address="");
	(isset($_SESSION['Contact']['City'])? $city = $_SESSION['Contact']['City']:$city="");
	(isset($_SESSION['Contact']['ZipCode'])? $zipcode = $_SESSION['Contact']['ZipCode']:$zipcode="");
	(isset($_SESSION['Contact']['YearBuilt'])? $yearbuilt = $_SESSION['Contact']['YearBuilt']:$yearbuilt="");
	(isset($_SESSION['Contact']['Sqft'])? $sqft = $_SESSION['Contact']['Sqft']:$sqft="");
	(isset($_SESSION['Contact']['NumStories'])? $numstories = $_SESSION['Contact']['NumStories']:$numstories="");
	(isset($_SESSION['Contact']['NumBathroomsFull'])? $bathrooms = $_SESSION['Contact']['NumBathroomsFull']:$bathrooms="");
	(isset($_SESSION['Contact']['FirstName'])? $firstname = $_SESSION['Contact']['FirstName']:$firstname="");
	(isset($_SESSION['Contact']['LastName'])? $lastname = $_SESSION['Contact']['LastName']:$lastname="");
	(isset($_SESSION['Contact']['Credit'])? $credit = $_SESSION['Contact']['Credit']:$credit="");
	(isset($_SESSION['Contact']['Phone1'])? $phone = $_SESSION['Contact']['Phone1']:$phone="");
	(isset($_SESSION['Contact']['Email'])? $email = $_SESSION['Contact']['Email']:$email="");
?>

<form action="/contact_form_167_post2.php" method="post" class="serviceable-form" id="js-serviceable-form">
	
	<input type="hidden" name="action" id="formAction" value="<?=r3e('create_lead')?>" />
	<input type="hidden" name="to" value="<?=r3e('/step2.html')?>" />
	<?
		//var_dump($_SESSION['bad_fields']);
		if( !empty($_SESSION['form_msg']) ) {
	?>
			<div class="invalid-fields" class="contact_form_error">
	<?
				print $_SESSION['form_msg'];
				unset($_SESSION['form_msg']);
				unset($_SESSION['bad_fields']);
	?>
			</div>
	<?
		}
	?>

	<div class="form-box">
		<div class="row custom-spacing">
			<div class="box-full">
				<h2>You're Almost Done!</h2>
				<p>Tell Us About Your Home</p>
			</div>
			<!-- /.box16 -->
		</div>
		<!-- /.row -->

		<div class="row custom-spacing">
			<div class="box-5 form-width-override">
				<input type="text" name="StreetAddress" class="StreetAddress" placeholder="Street Address" value="<?= $address?>" required>
			</div>
			<!-- /.box-4 -->
			<div class="box-5 form-width-override">
				<input type="text" name="City" class="City" placeholder="City" value="<?=$city?>" required/>
			</div>
			<!-- /.box-4 -->
			<div class="box-3 form-width-override">
				<select name="State" class="State" required >
					<option selected disabled value="">State</option>
					<option value="AL" <?=($state == 'AL'?'selected':'')?>>AL</option>
					<option value="AK" <?=($state == 'AK'?'selected':'')?>>AK</option>
					<option value="AZ" <?=($state == 'AZ'?'selected':'')?>>AZ</option>
					<option value="AR" <?=($state == 'AR'?'selected':'')?>>AR</option>
					<option value="CA" <?=($state == 'CA'?'selected':'')?>>CA</option>
					<option value="CO" <?=($state == 'CO'?'selected':'')?>>CO</option>
					<option value="CT" <?=($state == 'CT'?'selected':'')?>>CT</option>
					<option value="DE" <?=($state == 'DE'?'selected':'')?>>DE</option>
					<option value="FL" <?=($state == 'FL'?'selected':'')?>>FL</option>
					<option value="GA" <?=($state == 'GA'?'selected':'')?>>GA</option>
					<option value="HI" <?=($state == 'HI'?'selected':'')?>>HI</option>
					<option value="ID" <?=($state == 'ID'?'selected':'')?>>ID</option>
					<option value="IL" <?=($state == 'IL'?'selected':'')?>>IL</option>
					<option value="IN" <?=($state == 'IN'?'selected':'')?>>IN</option>
					<option value="IA" <?=($state == 'IA'?'selected':'')?>>IA</option>
					<option value="KS" <?=($state == 'KS'?'selected':'')?>>KS</option>
					<option value="KY" <?=($state == 'KY'?'selected':'')?>>KY</option>
					<option value="LA" <?=($state == 'LA'?'selected':'')?>>LA</option>
					<option value="ME" <?=($state == 'ME'?'selected':'')?>>ME</option>
					<option value="MD" <?=($state == 'MD'?'selected':'')?>>MD</option>
					<option value="MA" <?=($state == 'MA'?'selected':'')?>>MA</option>
					<option value="MI" <?=($state == 'MI'?'selected':'')?>>MI</option>
					<option value="MN" <?=($state == 'MN'?'selected':'')?>>MN</option>
					<option value="MS" <?=($state == 'MS'?'selected':'')?>>MS</option>
					<option value="MO" <?=($state == 'MO'?'selected':'')?>>MO</option>
					<option value="MT" <?=($state == 'MT'?'selected':'')?>>MT</option>
					<option value="NE" <?=($state == 'NE'?'selected':'')?>>NE</option>
					<option value="NV" <?=($state == 'NV'?'selected':'')?>>NV</option>
					<option value="NH" <?=($state == 'NH'?'selected':'')?>>NH</option>
					<option value="NJ" <?=($state == 'NJ'?'selected':'')?>>NJ</option>
					<option value="NM" <?=($state == 'NM'?'selected':'')?>>NM</option>
					<option value="NY" <?=($state == 'NY'?'selected':'')?>>NY</option>
					<option value="NC" <?=($state == 'NC'?'selected':'')?>>NC</option>
					<option value="ND" <?=($state == 'ND'?'selected':'')?>>ND</option>
					<option value="OH" <?=($state == 'OH'?'selected':'')?>>OH</option>
					<option value="OK" <?=($state == 'OK'?'selected':'')?>>OK</option>
					<option value="OR" <?=($state == 'OR'?'selected':'')?>>OR</option>
					<option value="PA" <?=($state == 'PA'?'selected':'')?>>PA</option>
					<option value="RI" <?=($state == 'RI'?'selected':'')?>>RI</option>
					<option value="SC" <?=($state == 'SC'?'selected':'')?>>SC</option>
					<option value="SD" <?=($state == 'SD'?'selected':'')?>>SD</option>
					<option value="TN" <?=($state == 'TN'?'selected':'')?>>TN</option>
					<option value="TX" <?=($state == 'TX'?'selected':'')?>>TX</option>
					<option value="UT" <?=($state == 'UT'?'selected':'')?>>UT</option>
					<option value="VT" <?=($state == 'VT'?'selected':'')?>>VT</option>
					<option value="VA" <?=($state == 'VA'?'selected':'')?>>VA</option>
					<option value="WA" <?=($state == 'WA'?'selected':'')?>>WA</option>
					<option value="WV" <?=($state == 'WV'?'selected':'')?>>WV</option>
					<option value="WI" <?=($state == 'WI'?'selected':'')?>>WI</option>
					<option value="WY" <?=($state == 'WY'?'selected':'')?>>WY</option>
				</select>
			</div>
			<!-- /.box-4 -->
			<div class="box-3 form-width-override">
				<input type="text" name="ZipCode" class="LeadZip" placeholder="Zip Code" value="<?= $zipcode?>" required/>
			</div>
			<!-- /.box-4 -->
		</div>
		<!-- /.row -->

		<div class="row">
			<div class="box-4 form-width-override">
				<select name="YearBuilt" class="YearBuilt" required>
					<option selected disabled value="">Year Built</option>
					<? 
					//create drop down finds the current year and adds a year to it 
					//so that they never have to update this drop down menu
					$current_year = date("Y");
					$current_month = date("m");

					if($current_month == '11' || $current_month == '12'){
						$current_year++;
					}
					$i = 0; for ($i = $current_year; $i >= 1800; $i--){ ?>
						<option value="<?=$i?>" <?=($yearbuilt == $i ? 'selected': '')?>><?=$i?></option>
					<? } ?>
				</select>
			</div>
			<!-- /.box-4 -->
			<div class="box-4 form-width-override">
				<select name="Sqft" class="SquareFootage" required>
					<option selected disabled value="">Sq. Ft.</option>
					<option value="500" <?=($sqft == '500' ? 'selected': '')?>>100-500</option>
					<option value="1000" <?=($sqft == '1000' ? 'selected': '')?>>600-1000</option>
					<option value="1500" <?=($sqft == '1500' ? 'selected': '')?>>1100-1500</option>
					<option value="2000" <?=($sqft == '2000' ? 'selected': '')?>>1600-2000</option>
					<option value="2500" <?=($sqft == '2500' ? 'selected': '')?>>2100-2500</option>
					<option value="3000" <?=($sqft == '3000' ? 'selected': '')?>>2600-3000</option>
					<option value="3500" <?=($sqft == '3500' ? 'selected': '')?>>3100-3500</option>
					<option value="4000" <?=($sqft == '4000' ? 'selected': '')?>>3600-4000</option>
					<option value="4500" <?=($sqft == '4500' ? 'selected': '')?>>4100-4500</option>
					<option value="5000" <?=($sqft == '5000' ? 'selected': '')?>>4600-5000</option>
					<option value="5500" <?=($sqft == '5500' ? 'selected': '')?>>5100-5500</option>
					<option value="6000" <?=($sqft == '6000' ? 'selected': '')?>>5600-6000</option>
					<option value="6500" <?=($sqft == '6500' ? 'selected': '')?>>6100-6500</option>
					<option value="7000" <?=($sqft == '7000' ? 'selected': '')?>>6600-7000</option>
					<option value="7500" <?=($sqft == '7500' ? 'selected': '')?>>7100-7500</option>
					<option value="8000" <?=($sqft == '8000' ? 'selected': '')?>>8000</option>
				</select>
			</div>
			<!-- /.box-4 -->
			<div class="box-4 form-width-override">
				<select name="NumStories" class="NumStories" required>
					<option selected disabled value=""># of Stories</option>
					<option value="1" <?=($numstories == '1' ? 'selected': '')?>>1</option>
					<option value="1H" <?=($numstories == '1H' ? 'selected': '')?>>1H</option>
					<option value="2" <?=($numstories == '2' ? 'selected': '')?>>2</option>
					<option value="2H" <?=($numstories == '2H' ? 'selected': '')?>>2H</option>
					<option value="3" <?=($numstories == '3' ? 'selected': '')?>>3</option>
					<option value="4" <?=($numstories == '4' ? 'selected': '')?>>4</option>
					<option value="BILEVEL" <?=($numstories == 'Bi-level' ? 'selected': '')?>>Bi-level</option>
					<option value="TRILEVEL" <?=($numstories == 'Tri-level' ? 'selected': '')?>>Tri-level</option>
				</select>
			</div>
			<!-- /.box-4 -->
			<div class="box-4 form-width-override">
				<select name="NumBathroomsFull" class="Bathrooms" required>
					<option selected disabled value="">Bathrooms</option>
					<option value="0" <?=($bathrooms == '0' ? 'selected': '')?>>0</option>
					<option value="1" <?=($bathrooms == '1' ? 'selected': '')?>>1</option>
					<option value="2" <?=($bathrooms == '2' ? 'selected': '')?>>2</option>
					<option value="3" <?=($bathrooms == '3' ? 'selected': '')?>>3</option>
					<option value="4" <?=($bathrooms == '4' ? 'selected': '')?>>4</option>
					<option value="5" <?=($bathrooms == '5' ? 'selected': '')?>>5</option>
				</select>
			</div>
			<!-- /.box-4 -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /.form-box -->

	<div class="form-box">
		<div class="row custom-spacing">
			<div class="box-full">
				<h2>Qualify for Your Discounts</h2>
				<p>Select which features you already have in your home</p>
			</div>
			<!-- /.box-full -->
		</div>
		<!-- /.row -->

		<div class="row">
			<div class="box-3rd form-width-override">
				<div class="checkbox">
					<input type="checkbox" value="dead_bolt" name="dead_bolt" />
					<a class="check-button dead_bolt checked" href="/">Deadbolts</a>
				</div>
				<!-- /.checkbox -->
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<div class="checkbox">
					<input type="checkbox" value="burglar_alarm" name="burglar_alarm"/>
					<a class="check-button burglar_alarm" href="/">Security Alarms</a>
				</div>
				<!-- /.checkbox -->
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<div class="checkbox">
					<input type="checkbox" value="smoke_detector" name="smoke_detector"/>
					<a class="check-button smoke_detector" href="/">Smoke Detectors</a>
				</div>
				<!-- /.checkbox -->
			</div>
			<!-- /.box-3rd -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /.form-box -->

	<div class="form-box basic-info">
		<div class="row custom-spacing">
			<div class="box-full">
				<h2>Last Few Questions Before We Display Your Results</h2>
			</div>
			<!-- /.box-full -->
		</div>
		<!-- /.row -->

		<div class="row custom-spacing">
			<div class="box-3rd form-width-override">
				<select name="Credit" class="Credit" id="CreditRating" required/>
					<option selected disabled value="">How's Your Credit?</option>
					<option value="850" <?=($credit == '850' ? 'selected': '')?>>Excellent (800+)</option>
					<option value="750" <?=($credit == '750' ? 'selected': '')?>>Great (700-799)</option>
					<option value="650" <?=($credit == '650' ? 'selected': '')?>>Average (600-699)</option>
					<option value="550" <?=($credit == '550' ? 'selected': '')?>>Below Average (500-599)</option>
					<option value="500" <?=($credit == '500' ? 'selected': '')?>>Poor (Below 500)</option>
				</select>
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<input type="text" name="FirstName" class="FirstName" placeholder="First Name" value="<?= $firstname?>" required/>
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<input type="text" name="LastName" class="LastName" placeholder="Last Name" value="<?= $lastname?>"required/>
			</div>
			<!-- /.box-3rd -->
		</div>
		<!-- /.row -->

		<div class="row custom-spacing">
			<div class="box-3rd form-width-override">
				<input type="text" name="Phone1" class="Phone1" placeholder="Phone Number" value="<?= $phone?>" required/>
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<input type="text" name="Email" class="Email" placeholder="Email Address" value="<?= $email?>" required/>
			</div>
			<!-- /.box-3rd -->
			<div class="box-3rd form-width-override">
				<p><a class="tooltip disabled" href="/"><img src="/assets/images/icon-tooltip.png" alt="Question Mark"> Why do we collect this? <span>The information we collect from you will be used only to provide you with multiple, competitive home insurance quotes from a HomeInsurance.com  agent. In the event that your property qualifies for discounts, we will contact you to verify eligibility. We do not share your information with 3rd party vendors.</span></a></p>
			</div>
			<!-- /.box-3rd -->
		</div>
		<!-- /.row -->

        <div class="row">
            <div class="box-full">
                <? include_once(RV_Web_SharedInclude::include_shared_file( 'homeinsurance', '_current_carrier_selector.php') ); ?>
            </div>
        </div>
	</div>
	<!-- /.form-box -->

	<div class="row with-spacing">
		<div class="box-half security-icon">
			<img src="/assets/images/security-icon.png" alt="Security Icon">
			<div>Privacy and <br>Security Protected</div>
		</div><!-- /.security-icon -->
		<!-- /.box-half -->
		<div class="box-half form-submit">
			<input type="submit" class="submit" name="submit" value="Show Me My Results"/>
		</div>
		<!-- /.box-half -->
	</div>
	<!-- /.row -->

	<div class="row with-spacing">
		<div class="box-full">
			<? 
				include_once( RV_LandingPage::find('includes/_disclosure.php') );
			?>
		</div>
		<!-- /.box-full -->
	</div>
	<!-- /.row with-spacing -->
</form>
<!-- /.form -->