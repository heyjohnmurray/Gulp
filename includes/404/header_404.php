<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<?

// set certain pages to noindex, nofollow, noodp
// replace <file name> with name of file without .html extension (ie: terms.html = terms)
if (stristr($_SERVER['SCRIPT_FILENAME'], '<file name>') || stristr($_SERVER['SCRIPT_FILENAME'], '<file name>')) {
	echo '<meta name="robots" content="noindex,follow,noodp" />';
}
elseif ($metaRobots) {
	echo '<meta name="robots" content="' . $metaRobots . '" />';
}
else {
	echo '<meta name="robots" content="index,follow,noodp" />';
}
echo "\n";

if($metaDescription) {
	echo '<meta name="description" content="' . $metaDescription . '" />';
}
echo "\n";

if ($metaKeywords) {
	echo '<meta name="keywords" content="' . $metaKeywords . '" />';
}
echo "\n";

?>

<? if ($canonicalURL = RV_Web_PageMeta::get_canonical_url()) { ?>
<link rel="canonical" href="<?=$canonicalURL?>" />
<? } ?>


<title><?=$headerTitle ?></title>

<?= (isset($hailoJs) ? $hailoJs : ""); ?>

<!-- CSS STYLE -->
<link href="/css/style.css" rel="stylesheet" media="screen" type="text/css" />
<?= RV_LandingPage::try_find_web_tag('css/experience.css','<link href="/##PATH##" rel="stylesheet" media="screen" type="text/css" />'); ?>
<link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
<!-- JAVASCRIPT -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>

<script type="text/javascript">

	$(document).ready(function() {
	
		// this highlights the errors on the contact form
        <?
        	if($_SESSION['bad_fields']) {
				foreach($_SESSION['bad_fields'] as $fieldName) {
		?>
				$(".<?= $fieldName ?>Label").css('color', '#fe0000');
		<?		}
			} 
		?>
	});

</script>

<? echo RV_webTools::get_js_enabled_script($siteParams->CompanyID); ?>
<? include_once(INCLUDE_DIR . "/ga_async.inc"); ?>

<? 
/*
*	we will use this to create ability to add active page styles to nav
*	----------------------------------------------------------------------
*	return the page name minus characters and html extension
*	and stores in $page_id variable
*
*	ie: contact_us.html's $pageClassName = contactus
*
*	you would then add class="contactus" to the <li> for contact_us.html
*	and target css appropriately 
*/
	$pageClassName = str_replace( array('.', '/', '-', '_', ' ', 'html'), '', ($_SERVER['SCRIPT_NAME'] == '/index.html' ? 'homepage' : $_SERVER['SCRIPT_NAME']) );
?>

<style type="text/css">

	.main_nav .<?= $pageClassName ?> a { background: #368d05;}	

</style>
</head>
<body>
	<div id="header">	
		<img src="/images/homeowners-insurance.png" alt="Home Insurance Quotes" width="401" height="79" class="logo" />
		<div class="tollfree"><span class="h-phone"><?=$sitePhone?></span></div>
		<div class="tagline">Get a quote by phone</div>
	</div>
	<!-- close header -->
	<div id="wrapper">
		