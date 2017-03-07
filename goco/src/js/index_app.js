$(document).ready(function() {
	/*var dh = $(document).height();
	$("#backDrop").height(dh);*/
	$("#fr_event_pop .clsBtn").on("click", function() {
		$(this).closest("#fr_box").css("display", "none");
		$("#backDrop").css("display", "none");
	});
});