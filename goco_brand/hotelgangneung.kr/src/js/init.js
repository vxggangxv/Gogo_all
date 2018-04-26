$(function() {
	//FAQ 노출, 질문 펼치기 및 닫기
	faq();
	// 모바일
	/*$("#faq .f_q").on("click", function () {
		$(this).next().slideToggle("fast");
	});
	$("#wrap .wrapperin .btn-area .btn-a").on("click", function () {
		$('#faq li').show();
	});*/
});

function faq() {
	var wrap = $("#faqWrap"),
		wrapBack = $("#faqWrap-back"),
		faqBtn = $("#faq-a");
	faqBtn.on('click', function() {
		$('body').css({
			"position": "fixed",
			"width": "100%"
		});
		wrapBack.fadeIn();
		$(this).addClass('on');
	});
	wrap.find(".i-x").on('click', function() {
		$('body').css({
			"position": "relative",
			"width": "100%"
		});
		wrapBack.hide();
		faqBtn.removeClass('on');
	});
	wrap.find(".d1").click(function() {
		$(this).next().slideToggle('fast');
		 $(this).toggleClass('on');
	});
	wrap.find(".faq-tab li").click(function() {
		var idx = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		wrap.find(".contents-tab > .faq-main").eq(idx).show().siblings().hide();
		console.log(idx);
	});
}