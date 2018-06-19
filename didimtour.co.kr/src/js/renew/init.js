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
		$('#rgSelect > .p1').text(thTxt);
	});
	$('#dtRgOption a').on('click', function() {
		var thTxt = $(this).text();
		$('#dtRgSelect > .p1').text(thTxt);
	});
	


});