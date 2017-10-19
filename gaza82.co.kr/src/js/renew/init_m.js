$(function() {

	// 검색박스, Option 박스 관련
	$('#rgSelect, #dtRgSelect').on('click', function() {
		if($(this).find('.rgOption').css('display') == 'block') {
			$(this).find('.rgOption').hide();
		} else {
			$(this).find('.rgOption').fadeIn();
		}
	});
	

	$('#rgOption a').on('click', function() {
		var thTxt = $(this).text();
		$('#rgSelect > .p1 .s-txt').text(thTxt);
	});
	$('#dtRgOption a').on('click', function() {
		var thTxt = $(this).text();
		$('#dtRgSelect > .p1 .s-txt').text(thTxt);
	});

	var rgOption, dtRgOption;

	$(function() {

		/*지역검색 drop박스 scrollbar UI*/
		rgOption = new IScroll('#rgOption', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true
		});
		
		dtRgOption = new IScroll('#dtRgOption', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true
		});


		$(this).find('.rgOption').hide();

	});

	//메인 bxslider
	$('#msBox01-slider').bxSlider({
		auto: true,
		speed: 500,
		duration: 6000,
		prevText: '',
		nextText: ''
	});


});

