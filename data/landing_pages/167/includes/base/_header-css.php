<?
	/*
	 * these are default project CSS files. do not split this file to add experience specific CSS files.
	 *
	 * if you need to add a new CSS file for a specific experience, you should split includes/base/_header-assets-additional.php
	 * and add your files there. this file is intended for default files, not experiences files.
	 */
?>
<link href="/<?= RV_LandingPage::try_find_web('assets/css/compiled.css', 'assets/css/compiled.css'); ?>" rel="stylesheet">
<?= RV_LandingPage::try_find_web_tag('assets/css/experience.css','<link href="/##PATH##" rel="stylesheet" media="screen">'); ?>