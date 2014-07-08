<?
	/*
	 * these are default project JS files. do not split this file to add experience specific JS files.
	 *
	 * if you need to add a new JS file for a specific experience, you should split includes/base/_footer-assets-additional.php
	 * and add your files there. this file is intended for default files, not experiences files.
	 */
?>
<script src="/assets/js/app.min.js"></script>
<?= RV_LandingPage::try_find_web_tag('js/experience.js','<script src="/##PATH##"></script>'); ?>