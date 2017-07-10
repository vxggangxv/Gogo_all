$(function () {
	//랭킹 텝 버튼
	$("#fr-rankbox li a").on("click", function () {
		var idx = $(this).parent().index();
		$(this).closest("ul").find("li").eq(idx).addClass("on").siblings().removeClass("on");
		return false;
	});
	//수익금 택 버튼
	$("#tab li").on("click", function() {
		var idx = $(this).index();
		$(this).addClass("on").siblings().removeClass("on");
		$("#tab-con").find("li").eq(idx).addClass("on").siblings().removeClass("on");
	});
	//공유버튼 클릭
	$("#promotion-sec .i-share").on("click", function() {
		$("#bg-drop, #q-modal").show();
	});
});