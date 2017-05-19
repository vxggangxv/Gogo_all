$(function() {
  //상세보기 슬라이더
  var main_swiper = new Swiper('#main-slider', {
    prevButton:'#slider-prev',
    nextButton:'#slider-next',
    loop: true
  });
  
  //전화문의
  $("#headTitle #h-phone").on("click", function() {
    $("#h-q-callPop").show();
  });
  $("#h-q-callPop .btn-a-cancel").on("click", function() {
    $(this).closest("#h-q-callPop").hide();
    return false;
  });
  //길찾기
  $("#g-map .btn-a").on("click", function() {
    $("#h-q-roadPop").show();
    return false;
  });
  $("#h-q-roadPop .btn-a-cancel").on("click", function() {
    $(this).closest("#h-q-roadPop").hide();
    return false;
  });
  //바코드
  $("#btn-barcode").on("click", function() {
    $("#barcode-pop").show();
    return false;
  });
  $("#barcode-pop .btn-a-cancel").on("click", function() {
    $(this).closest("#barcode-pop").hide();
    return false;
  });
  //탭 클릭시 
  $(".history-tab-01 ul li").on("click", function() {
    $(this).addClass("on").siblings().removeClass();
  });
  //이미지 클릭시 레이어팝업등장 
  $("#h04-pop").hide(); //팝업 숨김
  $("#history04-1 .thumb a").on("click", function() {
    $("#h04-pop").show();
    return false;
  });
  $("#h04-pop .btn-a-cancel").on("click", function() {
    $(this).closest("#h04-pop").hide();
    return false;
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
  //주변관광지 내부 탭
  $("#history04-tab li").on("click", function() {
    $(this).addClass("on").siblings().removeClass("on");
  });
  
});
