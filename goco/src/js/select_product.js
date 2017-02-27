$(function() {
	$("#fare_section #s1_label, #s1_label i1").on("click", function() {
		$(this).closest(".tit_box").find("#cal_wrap2").toggleClass("on");
		return false;
	});
	$("#fare_section #cal_wrap2 .clsBtn").on("click", function() {
		$(this).closest("#cal_wrap2").removeClass("on");
		return false;
	});
	$("#fare_table .f_td").on("click", function() {
		$(this).toggleClass("on");
	});

});