$(function() {
  /*상품선택 작동*/
	$("#tickets > ul > li").on("click", function() {
		$(this).toggleClass("on");
		//console.log($(this).find("input").prop("checked"));
		var isChk = $(this).find("input").prop("checked");
		isChk = !isChk ;
		$(this).find("input").prop("checked", isChk);
		//console.log($(this).find("input").prop("checked"));
	});
  $("#tickets .fl.tit .nth-1 label").on("click", function() {
    $(this).closest("li").toggleClass("on");
    //console.log('hi');
  });

  /*구매하기버튼 작동, 닫기버튼 작동*/
  /*$("#single_btn").on("click", function() {
    $("#backDrop").toggleClass("on");
    $("#tickets-list").toggleClass("on");
  });*/
  /*$("#tickets-list .cls-box a").on("click", function() {
    $("#backDrop").toggleClass("on");
    $("#tickets-list").toggleClass("on");
    $("#info_product_btn_w").hide();
    event.preventDefault();
  });*/

	/* 드롭다운 */
  /*$(".dropdown .btn").on("click", function() {
    $(this).next().slideToggle("fast");
  });
  $(".dropdown-menu > li > a").on("click", function() {
  	$(this).closest("ul").slideToggle("fast");
    var thTxt = $(this).text();
    //console.log(thTxt);
    var thHtml = thTxt + '<i class="fa fa-caret-down fa-lg" aria-hidden="true"></i>' ;
    $(this).closest("div").find("button").html(thHtml);

  });*/
});