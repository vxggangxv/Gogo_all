$(function() {
	$("#tickets > ul > li").on("click", function() {
		$(this).toggleClass("on");
		//console.log($(this).find("input").prop("checked"));
		var isChk = $(this).find("input").prop("checked");
		isChk = !isChk ;
		$(this).find("input").prop("checked", isChk);
		//console.log($(this).find("input").prop("checked"));
	});
});