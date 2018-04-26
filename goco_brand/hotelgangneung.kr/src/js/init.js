$(function() {
	//FAQ 노출, 질문 펼치기 및 닫기
	$("#faq-a").on('click', function() {
		$('body').css({
			"position": "fixed",
			"width": "100%"
		});
		$("#faqWrap-back").fadeIn();
		$(this).addClass('on');
	});
	$("#faqWrap .i-x").on('click', function() {
		$('body').css({
			"position": "relative",
			"width": "100%"
		});
		$("#faqWrap-back").hide();
		$("#faq-a").removeClass('on');
	});
	$("#faqWrap .d1").click(function() {
		$(this).next().slideToggle('fast');
		 $(this).toggleClass('on');
	});
	// 모바일
	/*$("#faq .f_q").on("click", function () {
		$(this).next().slideToggle("fast");
	});
	$("#wrap .wrapperin .btn-area .btn-a").on("click", function () {
		$('#faq li').show();
	});*/
});