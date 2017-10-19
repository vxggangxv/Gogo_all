$(function () {

	//메인 bxslider
	$('#msBox01-slider').bxSlider({
		auto: true,
		speed: 500,
		duration: 6000,
		prevText: '<img src="http://img.gaza82.co.kr/renew/btn_prev.png" alt="이전">',
		nextText: '<img src="http://img.gaza82.co.kr/renew/btn_next.png" alt="다음">'
	});
	$('#msBox02-slider, #msBox03-slider').bxSlider({
		auto: true,
		speed: 500,
		duration: 6000,
		prevText: '',
		nextText: ''
	});
	
	// Content-nav 전지역보기 버튼 클릭
	$("#rg-drBox button").on('click', function() {
		if($(this).next().css('display') == 'block') {
			$(this).next().hide();
		} else {
			$(this).next().fadeIn();
		}
	});


});