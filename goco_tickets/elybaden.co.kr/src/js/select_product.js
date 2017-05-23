$(function() {
	$("#fare_section #s1_label, #s1_label i1").on("click", function() {
		$(this).closest(".tit_box").find("#cal_wrap2").toggleClass("on");
		return false;
	});
	$("#fare_section #cal_wrap2 .clsBtn, #cal_wrap2 .btn_close").on("click", function() {
		$(this).closest("#cal_wrap2").removeClass("on");
		return false;
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