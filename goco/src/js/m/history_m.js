$(function() {
  //탭 클릭시 
  $(".history-tab-01 ul li").on("click", function() {
    $(this).addClass("on").siblings().removeClass();
  });
  //공지사항 리스트 페이지번호
  $("#pagenation a").on("click", function() {
    var idx = $(this).index();
    var lastIdx = $(this).closest("div").find("a").length;
    lastIdx -- ;
    //console.log(lastIdx);
    if( idx != 0 && idx != lastIdx){
      $(this).addClass("on").siblings().removeClass("on");
    }
    event.preventDefault();
  });
});