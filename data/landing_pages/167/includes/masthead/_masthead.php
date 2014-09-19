<?php 
	$showPhone = true;

	if(isset($_SESSION['Contact']['Status']) && ($_SESSION['Contact']['Status'] == 'Ineligible' || $_SESSION['Contact']['Status'] == 'Ineligible2')) {
		$showPhone = false;
	}
?>

<header class="masthead">
	<div class="container">
		<div class="row">
			<div class="box-half">
				<a href="/" class="logo">
					HomeownersInsurance<span>.com</span>
				</a><!-- /. logo -->
			</div><!-- /. box-full -->
			<?php if ($showPhone): ?>
				<div class="box-half">
					<div class="cta">
						Get a quote by phone! <span class="h-phone"><?=$sitePhone?></span>
					</div>
				</div><!-- /.box-12 -->
			<?php endif; ?>
		</div><!-- /. row -->
	</div><!-- /. container -->
</header><!-- /.masthead -->