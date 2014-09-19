<?
	/*
	 * these are default project JS files. do not split this file to add experience specific JS files.
	 *
	 * if you need to add a new JS file for a specific experience, you should split includes/base/_footer-assets-additional.php
	 * and add your files there. this file is intended for default files, not experiences files.
	 */
?>
<script>
	$(function() {
		$('.js-providers').cycle('fade');

		$('.check-button').click(function(e){
            var checkButton = $(this),
            checkBox = checkButton.prev('input');

            checkButton.toggleClass('checked');
            if (checkButton.is('.checked')) {
                    checkBox.attr('checked', 'checked');
                } else {
                    checkBox.removeAttr('checked');
            }
            e.preventDefault();
        });
	//close jquery	
	});
</script>
<?= RV_Assets::min_js("/js/dist/dist.js") ?>
<script src="/js/ga_events.js"></script>
<script src="/assets/js/project.min.js"></script>
<?= RV_LandingPage::try_find_web_tag('js/experience.js','<script src="/##PATH##"></script>'); ?>