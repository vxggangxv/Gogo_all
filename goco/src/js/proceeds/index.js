$(function() {
  $("#gnb ul li a").on("click", function() {
    var idx = $(this).parent().index();
    $(this).closest("ul").find("li").eq(idx).addClass("on").siblings().removeClass("on");
  });
});