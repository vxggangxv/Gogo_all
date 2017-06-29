$(function () {
    $("#fare_section #s1_label, #s1_label i1").on("click", function () {
        $(this).closest(".tit_box").find("#cal_wrap2").toggleClass("on");
        return false;
    });
    $("#fare_section #cal_wrap2 .clsBtn, #cal_wrap2 .btn_close").on("click", function () {
        $(this).closest("#cal_wrap2").removeClass("on");
        return false;
    });

    // 고정네비게이션 상세검색 노출
    /*$("#fix-nav a.more-a").on("click" , function() {
        $(this).toggleClass("on");
        $("#fix-nav div.nb-drop-bar").toggleClass("on");
        return false;
    });*/
    // 고정네비게이션 상세검색 닫기
    /*$("#fix-nav .i-close").on("click", function() {
        $("#fix-nav div.nb-drop-bar, #fix-nav a.more-a").toggleClass("on");
        return false;
    });*/
    

    // 확인팝업 중앙정렬
    var wd = $("#sltCheck-sec").width() / 2;
    $("#sltCheck-sec").css({
        "margin-left": -wd
    });

    // 툴팁 위치 지정
    $("#pdtSlt-sec .part-3 > div").each(function () {
        var ht = $(this).find(".ul-2").height() + 42;
        $(this).find(".ul-2").css("top", -ht);
    });

    // 이용안내
    $("#pdtSlt-sec .part-3 > div a.useInf").on("click", function () {
        $(this).parent().next().toggleClass("on");
        return false;
    });

    /*$("#rsv_s_list div.pdtSlt-sec span.lbl").on("click", function () {
        $(this).closest("li").toggleClass("on");
        var isChecked = $(this).prev().prop("checked");
        isChecked = !isChecked;
        $(this).prev().prop("checked", isChecked);
        if (isChecked) {
            $(this).closest("li").find(".slt-drop").addClass("on");
        } else {
            $(this).closest("li").find(".slt-drop").removeClass("on");
        }
    });*/
    $("#rsv_s_list div.pdtSlt-sec input[type=checkbox]").on("click", function () {
        $(this).closest("li").toggleClass("on");
        var isChecked = $(this).prop("checked");
        if (isChecked) {
            $(this).closest("li").find(".slt-drop").addClass("on");
        } else {
            $(this).closest("li").find(".slt-drop").removeClass("on");
        }
    });
    /*$("#fare_table .f_td, #day_table .f_td").on("click", function() {
    	$(this).toggleClass("on");
    });*/
    /*$("#day_table .f_td .c2 .p2 .in1").prev().on("click", function() {
    	var thVal = $(this).closest("div").find("input").val();
    	if( thVal > 0){
    		thVal --;
    		$(this).next().val(thVal);
    	}
    	var firstVal = $("#day_table .f_td .c2 div:eq(0) .p2 .in1").val();
    	var secondVal = $("#day_table .f_td .c2 div:eq(1) .p2 .in1").val();
    	console.log(firstVal);
    	console.log(secondVal);
    	if ( firstVal == 0 && secondVal == 0){
    		$(this).closest(".f_td").removeClass("on");
    	}
    	return false;
    });
    $("#day_table .f_td .c2 .p2 .in1").next().on("click", function() {
    	var thVal = $(this).closest("div").find("input").val();
    	if( thVal < 0){
    		thVal ++;
    		$(this).next().val(thVal);
    	}
    	$(this).closest(".f_td").addClass("on");
    	var firstVal = $("#day_table .f_td .c2 div:eq(0) .p2 .in1").val();
    	var secondVal = $("#day_table .f_td .c2 div:eq(1) .p2 .in1").val();
    	console.log(firstVal);
    	console.log(secondVal);
    	if ( firstVal == 0 && secondVal == 0){
    		$(this).closest(".f_td").removeClass("on");
    	}
    	return false;
    });*/

});