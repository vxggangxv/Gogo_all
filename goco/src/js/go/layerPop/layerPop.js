$(function() {

    fixedPop("", ".pop-manage", ".pop-manage .btn-cls", "on");
    fixedPop("", ".pop-manage-2", ".pop-manage-2 .btn-cls", "on");

});

// 고정 레이어 팝업 띄우기
function fixedPop(op, itm, cls, bodyFix) {
    var popOpen = $(op),
        pop = $(itm),
        popCls = $(cls),
		popDropBg = $(".backDropBg"),
        popWrap = $(".wrap-pop");

    popOpen.on("click", function() {
		popWrap.addClass('show');
		popDropBg.show();
        var wd = pop.width();
        var ht = pop.height();
		pop.addClass('on');
        pop.css({
            position: "fixed",
            left: "50%",
            marginLeft: -wd/2,
            top: "50%",
            marginTop: -ht/2
        });
		if (bodyFix == "on") {
			$("body").css({
				overflow: "hidden"
			});
		}
        return false;
    });

    popCls.on("click", function() {
		popWrap.removeClass('show');
		popDropBg.hide();
        pop.removeClass('on');
		if (bodyFix == "on") {
			$("body").css({
				overflow: "auto"
			});
		}
    });

}

// 레이어 팝업 비노출
function hidePop(itm) {
    $(itm).hide();
    $(itm).closest(".wrap-pop").css("z-index", "-1");
}

// 레이어 팝업 노출
function showPop(itm) {
    $(itm).show();
    $(itm).closest(".wrap-pop").css("z-index", "100");
}