$(document).ready(function(){
	$(window).scroll(function(){
		if ($(window).scrollTop() >= 100)
		{
			$('.move_top').show();
		}else {
			$('.move_top').hide();
		}
	});
	$('.move_top a').click(function(){
		$('html, body').stop().animate({scrollTop:0}, 200);
		return false;
	});
	/* 이용일선택 달력 */
	$('.datepic .date_area > p').click(function(){
		$('.datepic').addClass('on');
		$('.datepic .calendar').slideDown();
		$('body').css('overflow','hidden').bind('touchmove', function(e){e.preventDefault()});
	});
	$('.datepic .calendar .btn_close').click(function(){
		$('.datepic').removeClass('on');
		$('.datepic .calendar').slideUp();
		$('body').css('overflow','').unbind('touchmove');
		return false;
	});
	/* 입장권 구매 펼쳐보기 */
	$('.item:gt(1)').hide();
	$('.section .accordion').click(function(){
		if ($(this).find('span').hasClass('on'))
		{
			$(this).find('span').text('펼쳐보기').removeClass('on');
			$(this).next().find('.box:gt(1)').hide();
		}else {
			$(this).find('span').text('접기').addClass('on');
			$(this).next().find('.box:gt(1)').show();
		}
	});
	/* 환불정책 안내 */
	$('.notice > p').click(function(){
		$(this).toggleClass('on');
	});
	/* 결제수단 선택 */
	$('.payment_list li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
	});
	/* 레이어팝업 */
	$('.layer_popup').click(function(){
		var ancor = $(this).attr('href');
		$(ancor).fadeIn(200);
		$('body').css('overflow','hidden').bind('touchmove', function(e){e.preventDefault()});
	});
	$('.layer_pop .pop_area .pop_close').click(function(){
		$(this).parents('.layer_pop').fadeOut(200);
		$('body').css('overflow','').unbind('touchmove');
		return false;
	});
});