// Default Functions


// Fancybox
$(document).ready(function() {
	//Fancybox
	$("a.fancybox").fancybox({
		'titlePosition':'inside',
		'showNavArrows': false
	});
})


// Scroll To
$('a.scroll').click(function(e){
	var scroll_height = $($(this).attr('href')).offset().top - 80;
	$('html, body').stop().animate({scrollTop: (scroll_height)}, 800);
	e.preventDefault();
});


// Tabs
$(function(){
	$('#tab1').show();
	$('#tabButton1').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab1').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton2').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab2').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton3').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab3').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton4').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab4').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton5').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab5').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton6').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab6').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton7').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab7').fadeIn(600);
		$(this).addClass('active');
	});
	$('#tabButton8').click(function(){
		$('.tab-frame').hide();
		$('ul.tabs-nav li').removeClass('active');
		$('#tab8').fadeIn(600);
		$(this).addClass('active');
	});
});


// Tooltips
$('a.tooltip').click(function(e){
	e.preventDefault();
});
$('.tooltip').hover(
	function(){
	$(this).find('span').stop().show();
	},
	function(){
	$(this).find('span').stop().fadeOut(100);
});


$.ajaxSetup ({  
    cache: false  
});  
var ajax_load = '<img src="images/loader.gif" alt="loading..."/>';  
var loadUrl = 'temp/test.html';
var targetFrame = '#testLoad';
$('#load').click(function(e){
	e.preventDefault();
    $(targetFrame).html(ajax_load).load(loadUrl);
}); 






