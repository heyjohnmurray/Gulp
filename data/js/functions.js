// Default Functions


// Document Ready
$(document).ready(function() {
	$('.mobile-nav').click(function(){
		$('header nav ul').fadeToggle(100);
	});
	
	$('#sliderWrap').cycle({
		fx: 'scrollHorz', 
		speed: 300, 
		timeout: 0,
		cleartype: true,
		cleartypeNoBg: true,
		pager: '#slidePager',
		next: '.slideNext',
		slideResize: 0,
		pagerEvent: null,
		pause: 0,
		pagerAnchorBuilder: function(idx, slide){ 
        	return '<a href="#">' + (idx + 1) + '<span class="pager-tip">' + slide.title + '</span></a>';
        }
	});
	$('.slide').removeAttr('title');
}) //End


// Window Resizer
$(function(){
    $('#sliderWrap, .slide').css({'height':(($(window).height()-250))+'px'});
    $('.intro-wrap').css({'top':(($(window).height()/2-230))+'px'});
    $('.frame-content').each(function(){
    	var content = $(this).height()/2;
    	$(this).css({'top':(($(window).height()/2-content+20))+'px'});
    });
    
    $(window).resize(function(){
        $('#sliderWrap, .slide').css({'height':(($(window).height()-250))+'px'});
        $('.frame-content').each(function(){
    		var content = $(this).height()/2;
    		$(this).css({'top':(($(window).height()/2-content+20))+'px'});
    	});
    });
});

