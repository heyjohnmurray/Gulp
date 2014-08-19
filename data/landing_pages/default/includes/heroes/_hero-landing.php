<div class="hero hero-landing">

	<?
		/*
		 * the example below looks for the first image parameter in experience ###/images (ie: 100/images/heroes/hero-landing.jpg),
		 * if it doesn't find it, it will fall back to data/images (ie: data/images/heroes/hero-landing.jpg)
		 * 
		 * this method is only if you want to put the hero image in the experience folder, not create a structure such as
		 * data/images/100/heroes/hero-landing.jpg. either way is fine, it's up to you.
		 *
		 * REMOVE THIS COMMENT BEFORE PUSHING TO PRODUCTION. IT'S JUST HERE FOR THOSE NOT FAMILIAR WITH TRY_FIND_WEB
		 */
	?>
	
	<img src="/<?= RV_LandingPage::try_find_web('assets/images/heroes/hero-landing.jpg', 'assets/images/heroes/hero-landing.jpg'); ?>" alt="" />

</div><!-- /.hero-landing -->