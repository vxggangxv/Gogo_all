$(function() {
  $('.bx-box').bxSlider({
    auto: true,
    captions: true,
    prevSelector: '#slider-prev',
    nextSelector: '#slider-next',
    prevText: '',
    nextText: ''
  });
  
  $('#nav li a').bind('click', function() {
    var $_anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($_anchor.attr('href')).offset().top - 106
    }, 800, 'easeInOutQuad');
    return false;
  });
  
  var $_target = $("[class*='-sec']");
  $(window).scroll(function() {
    var st = $(window).scrollTop();
    $_target.each(function(i) {
      var posY = $(this).offset().top - 106;
      if ( st >= posY ) {
        $("#nav li").eq(i).addClass("on").siblings().removeClass("on");
      } if ( st == $(document).height() - $(window).height() ) {
        $("#nav li:last").addClass("on").siblings().removeClass("on");
      }
    });
  });
});