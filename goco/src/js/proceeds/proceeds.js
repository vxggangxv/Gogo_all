$(function() {
  //네비게이션 버튼 
  $("#gnb ul li a").on("click", function() {
    var idx = $(this).parent().index();
    $(this).closest("ul").find("li").eq(idx).addClass("on").siblings().removeClass("on");
  });
  //공지사항 리스트 페이지번호
  $("#pagenation a").on("click", function() {
    var idx = $(this).index();
    var lastIdx = $(this).closest("div").find("a").length;
    lastIdx -- ;
    console.log(lastIdx);
    if( idx != 0 && idx !=1 && idx != lastIdx && idx != lastIdx-1){
      $(this).addClass("on").siblings().removeClass("on");
    }
    event.preventDefault();
  });
});