var total_width = 385;
var navi_total = 5;
var img_border = 0;
var img_margin = 0;

var img_width = 385;
var img_height = 257;
var btn_top = (img_height - 30) / 2;
var img_wrap_width = img_width + (img_margin * 2);

var side_width = (total_width - img_wrap_width) / 2 - 1;
var navi_img_width = 74;
var navi_img_height = 55;

var autoSlide;	// 슬라이드 자동 실행
var numPrev;	// 이전 번호
var numNext;	// 다음 번호
var numCurr;	// 현재 번호
var mouseOver;		// 마우스 오버 상태



var slide = {
	
	start2: function(folder){

		// CSS 설정
		$("#jwSlide_wrap").css({"width":total_width, "border":"0px"});
		//$(".jwSlide_btn").css({"width":side_width, "float":"left"});

		$("#jwSlide_navi").css({"width":navi_img_width, "height":navi_img_height});
		
		var fld = folder;
		folder2 = fld;
		
		
		slide.view(1, folder2);		// 초기 화면 1
	},
	view: function(num, folder){
		clearTimeout(autoSlide);	// 이전에 실행되던 슬라이드 자동실행 중지
		numCurr = num;
		// 처음, 마지막 이미지의 경우 이전, 다음 값을 서로 연결하여 무한루트 구현
		if(num == 1){
			numPrev = navi_total;
			numNext = num + 1;
		}else if(num == navi_total){
			numPrev = num - 1;
			numNext = 1;
		}else{
			numPrev = num - 1;
			numNext = num + 1;
		}
		
		/*
		$("#jwSlide_view #img_view").error(function() {
			$("#jwSlide_view #img_view").attr("src", $("#img_navi_"+num).attr("src"));
		}).attr("src", "http://file.go.co.kr/"+folder+"/main_0"+num+".jpg");*/
		
		$("#jwSlide_view #img_view").attr("src", $("#img_navi_"+num).attr("src"));

		$("#jwSlide_navi img").css({"width":navi_img_width, "float":"left", "margin":img_margin, "opacity":"0.5", "border":"0px"});
		$("#img_navi_"+num).css({"margin":img_margin - img_border, "border":img_border+"px solid #B48C50", "opacity":"1"});
		
		$("#jwSlide_left .btn_link").attr("href", "javascript:slide.view("+numPrev+", '"+folder+"')");
		$("#jwSlide_right .btn_link").attr("href", "javascript:slide.view("+numNext+", '"+folder+"')");

		if(mouseOver != "over"){
			autoSlide = setTimeout("slide.view("+numNext+", '"+folder+"')", 5000);
		}
	},

	btn_over: function(on){
		if(on == "prev"){
			$("#jwSlide_left .btn").css({"opacity":"1"});
		}else if(on == "next"){
			$("#jwSlide_right .btn").css({"opacity":"1"});
		}else{
			$(".jwSlide_btn .btn").css({"opacity":"0.5"});
		}
	},
	
	img_over: function(over, folder){
		mouseOver = over;
		if(mouseOver == "over"){
			clearTimeout(autoSlide);
		}else{
			autoSlide = setTimeout("slide.view("+numNext+", '"+folder+"')", 5000);
		}
	},
	
	navi_over: function(num){
		$("#jwSlide_navi img").css({"opacity":"0.5"});
		$("#img_navi_"+numCurr).css({"opacity":"1"});
		if(num != 0){
			$("#img_navi_"+num).css({"opacity":"1"});
		}
	}
}

