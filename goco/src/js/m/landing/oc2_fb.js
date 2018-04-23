$(function() {
	// 모바일
	$("#faq-wrap .f_q").on("click", function () {
		$(this).parent().siblings().find('.f_a').slideUp('fast');
		$(this).next().slideToggle("fast");
	});
});