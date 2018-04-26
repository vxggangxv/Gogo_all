function max_page(){
		alert('마지막 페이지입니다.');
	}
function select_cate(){
	$("#search_form").submit();
}

function number_format(num) {
	var num_str = num.toString();
	var result = '';
	 
	for(var i=0; i<num_str.length; i++) {
		var tmp = num_str.length-(i+1);
		if(i%3==0 && i!=0) result = ',' + result;
			result = num_str.charAt(tmp) + result;
		}
	return result;
}

function ___getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else {
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth; 
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) {
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) {
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	

	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	if(xScroll < windowWidth){	
		pageWidth = xScroll;		
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

var pop = {
	open: function(imgname, width, height) {
		url	= "/common/popup.php?imgname="+imgname+"&w="+width+"&h="+height;
		ww	= window.open(url, "pop", "width="+width+", height="+height+", scrollbars=no");
		ww.focus();
	}
}

var bg_slide_cur;
var bg_slide_autoPlay;
var major_cur;
var num_curr;

var main = {

	bg_slide_view: function(num) {
		clearTimeout(bg_slide_autoPlay);
		bg_slide_cur = num;
		num_curr = num;
		var bg_img_src = $("#bg_img"+bg_slide_cur).val();

		$("#wrapper_main .slides_bn").fadeOut(200, function(){
			$("#wrapper_main .slides_bn").css({"background":"url("+bg_img_src+") no-repeat center;"});
			$("#wrapper_main .slides_bn").css({"background":"url("+bg_img_src+") no-repeat center"});
			$("#wrapper_main .slides_bn").fadeIn(200);
		});

		bg_slide_autoPlay = setTimeout("main.bg_slide_set('next')", 5000);
	},

	bg_slide_set: function(val) {
		var arr_size = $(".bg_img").length;
		if(val == "next") {
			if(bg_slide_cur >= (arr_size - 1)) {
				num_go = 0;
			} else {
				num_go = bg_slide_cur + 1;
			}
		} else if (val == "prev") {
			if(num_curr <= 0) {
				num_go = bg_slide_cur = (arr_size - 1);
			} else {
				num_go = bg_slide_cur - 1;
			}
		}
		main.bg_slide_view(num_go);
	},

	news_list: function(type, count) {
		var type2;

		$("#Mnews_news").attr("class", "right");
		$("#Mnews_notice").attr("class", "right");
		
		switch(type) {
			case "field" :	type2 = "news";		break;
			default:		type2 = type;		break;
		}

		$("#Mnews_"+type2).attr("class", "choice");
			
		$.ajax({
			type	: "POST",
			url		: "/home/main/action.php",
			data	: {mode: type, rowCount: count},
			success	: function(data) {
				$("#Mnews_list").html(data);
			}
		});
	},

	major_view: function(num) {
		major_cur = num;
		$(".major").hide();	
		$("#major"+num).show();
	},

	major_set: function(type) {
		var major_size = $("ul[class=major]").length;
		var num;
		if(type == 'prev') {
			if(major_cur > 1) {
				num = major_cur - 1;
			} else {
				num = major_size;
			}

		} else {
			if(major_cur < major_size) {
				num = major_cur + 1;
			} else {
				num = 1;
			}
		}
		main.major_view(num);
	},

	project_view: function(num) {
		var dot_img_on = "http://img.wooduckwd.co.kr/main_project_btn_roll_on.jpg";
		var dot_img_off = "http://img.wooduckwd.co.kr/main_project_btn_roll_off.jpg";
		$("#Mproject .img").hide();
		$("#Mproject #project"+num).show();
		$(".project_dot").attr("src", dot_img_off);
		$("#project_dot"+num).attr("src", dot_img_on);
	}
}
var room = {
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
		
		$("#jwSlide_view #img_view").attr("src", $("#room_slide"+num).attr("src"));

		$("#jwSlide_navi img").css({"width":navi_img_width, "float":"left", "margin":img_margin, "opacity":"0.5", "border":"0px"});
		$("#room_slide"+num).css({"margin":img_margin - img_border, "border":img_border+"px solid #B48C50", "opacity":"1"});

		if(mouseOver != "over"){
			autoSlide = setTimeout("room.view("+numNext+", '"+folder+"')", 5000);
		}
	},

	room_slide_view: function(num) {
		clearTimeout(bg_slide_autoPlay);
		bg_slide_cur = num;
		num_curr = num;
		var bg_img_src = "http://img.gobs.co.kr/room_deluxe_ond_img0"+num+".jpg";

		$("#room_gallery .room_slide_main").fadeOut(200, function(){
			$("#room_gallery .room_slide_main").attr("src",bg_img_src);
			$(".thum_img_on").attr("class","thum_img");
			$("#room_gallery #room_slide"+num).attr("class","thum_img_on");
			$("#room_gallery .room_slide_main").fadeIn(200);

		});

		bg_slide_autoPlay = setTimeout("room.room_slide_set('next')", 5000);
	},

	room_slide_set: function(val) {
		var arr_size = 7;
		if(val == "next") {
			if(bg_slide_cur >= (arr_size - 1)) {
				num_go = 1;
			} else {
				num_go = bg_slide_cur + 1;
			}
		} else if (val == "prev") {
			if(num_curr <= 0) {
				num_go = bg_slide_cur = (arr_size - 1);
			} else {
				num_go = bg_slide_cur - 1;
			}
		}
		room.room_slide_view(num_go);
	},
	
	news_list: function(type, count) {
		var type2;

		$("#Mnews_news").attr("class", "right");
		$("#Mnews_notice").attr("class", "right");
		
		switch(type) {
			case "field" :	type2 = "news";		break;
			default:		type2 = type;		break;
		}

		$("#Mnews_"+type2).attr("class", "choice");
			
		$.ajax({
			type	: "POST",
			url		: "/home/main/action.php",
			data	: {mode: type, rowCount: count},
			success	: function(data) {
				$("#Mnews_list").html(data);
			}
		});
	}
}

var brd ={
	pass_tr: function(tr_num) {
		if($("#cont_"+tr_num).hasClass("on") == false) {
			if($("#tr_"+tr_num).hasClass("on") == true) {
				$("#tr_"+tr_num).hide();
				$("#tr_"+tr_num).removeClass("on"); 
			} else {
				$("#tr_"+tr_num).show();
				$("#tr_"+tr_num).addClass("on");
				$("#tr_"+tr_num+" input[name='passwd']").focus();
			}
		} else {
			brd.list_view(tr_num);
		}

	},
	list_view: function(num) {
		if($("#cont_"+num).hasClass("on") == true) {
			$("#cont_"+num).hide();
			$("#reply_"+num).hide();
			$("#cont_"+num).removeClass("on");
			$("#reply_"+num).removeClass("on");
		} else {
			$("#cont_"+num).show();
			$("#reply_"+num).show();
			$("#cont_"+num).addClass("on");
			$("#reply_"+num).addClass("on");
			$.ajax({
				url : "./state.php",
				type : "post",
				data: "mode=hit_updt&num="+num,
				success: function(re) {

				}
			});
		}
	},
	pass_chk: function(num) {
		if($("#sform_"+num+" input[name='passwd']").val() == "") {
			alert("비밀번호를 입력하세요.");
			$("#sform_"+num+" input[name='passwd']").focus();
			return;
		}
		
		var string = $("#sform_"+num+"").serialize();
		$.ajax({
			url: "./state.php",
			data: "mode=pass_chk&"+string,
			type: "post",
			success: function(e) {
				var str = e.split("||");
				if(str[0] == "succ") {
					/*
					$("#tr_"+num).hide();
					$("#tr_"+num).removeClass("on"); 
					brd.list_view(num);
					return;
					*/
					location.href=str[1];
				} else if(str[0] == "succ2") {
					$("#repo_cont"+str[1]+"_box").hide();
					brd.show_cont("repo_cont"+str[1], "reply_"+str[1]);
					
				}  else if(str[0] == "succ3") {
					$("#dreview_cont"+str[1]+"_box").hide();
					mb.show_cont_mobile("dreview_cont"+str[1], num, 'report');
					
				} else {
					alert("비밀번호가 일치하지않습니다.");
					$("#sform_"+num+" input[name='passwd']").val('');
					$("#sform_"+num+" input[name='passwd']").focus();
					return;
				}
			}
		});
	},
	write_submit : function(){
		if($("#subject").val() == "" || $.trim($("#subject").val()) == "") {
			alert("제목을 입력하세요.");
			$("#subject").focus();
			return;
		}

		if($("#name").val() == "" || $.trim($("#name").val()) == "") {
			alert("작성자명을 입력하세요.");
			$("#name").focus();
			return;			
		}


		/*
		if($("#passwd").val() == "" || $.trim($("#passwd").val()) == "") {
			alert("비밀번호를 입력하세요.");
			$("#passwd").focus();
			return;
		}
		*/

		if($("#phone1").val() == "" || $.trim($("#phone1").val()) == "") {
				alert("휴대폰번호를 입력하세요.");
				$("#phone1").focus();
				return;
		}
		if($("#phone2").val() == "" || $.trim($("#phone2").val()) == "") {
				alert("휴대폰번호를 입력하세요.");
				$("#phone2").focus();
				return;
		}
		if($("#phone3").val() == "" || $.trim($("#phone3").val()) == "") {
				alert("휴대폰번호를 입력하세요.");
				$("#phone3").focus();
				return;
		}

		var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
		var email = $("#email").val();
		if(!reg_email.test(email)){
			alert("이메일 형식에 맞게 입력해주세요.");
			return false;
		}

		if($("#contents").val() == "" || $.trim($("#contents").val()) == "") {
			alert("내용을 입력하세요.");
			$("#contents").focus();
			return;
		}

		$("#write_form").submit();
	},
	view_delete: function(num) {
		if(confirm("글을 삭제하시겠습니까?") == true) {
			$.ajax({
				url : "state.php",
				data: "mode=delete&no="+num,
				type: "post",
				success: function(e) {
					var str = e.split("||");
					alert(str[0]);
					location.href = str[1];
					
				}
			});			
		}
	},
	show_cont_review: function(cont_id, bnum, table) {
		var find2 = $("#"+cont_id).attr("class");
		if(find2 == "repo_on") {
			$("#"+cont_id).hide();
			$("#"+cont_id).removeClass("repo_on");
		} else {
			if(table == "BlueAD_nomal_faq") {
				var find = $(".faq_t").find(".tit").length;
				for(i=0;i<find;i++) {
					$("#faq_cont"+i).hide();
					$("#faq_cont"+i).removeClass("repo_on");
				}
			} else {
				var find = $("#qna_t").find(".tit").length;
				for(i=0;i<find;i++) {
					$("#repo_cont"+i).hide();
					$("#repo_cont"+i).removeClass("repo_on");
				}
			}
			$("#"+cont_id).show();
			$("#"+cont_id).addClass("repo_on");
			navi.move("tit_"+cont_id);

			if(bnum != "") {
			$.ajax({
				type: "post",
				url : "./state.php",
				data: "mode=hit_updt&no="+bnum+"&table="+table,
				success: function(data) {
					
				}
			});
			}
		}
	},
	faq_vote: function(bnum, star, k) {
		if(confirm("만족도 평가를 완료하겠습니까?") == true) {
			$.ajax({
				url : "/customer/state.php",
				data: "mode=faq_vote&no="+bnum+"&star="+star,
				type: "post",
				success: function(e) {
					alert(e);	
					$("#star"+k).hide();
					$("#end"+k).show();
				}
			});
		}
	},
	mover: function(tval) {
		$(tval).attr("src", $(tval).attr("src").replace(/(\.gif|\.jpg|\.png)$/, "_ov$1"));
	},
	search_faq: function() {
		if($("#sform #keyword").val() == "") {
			alert("검색어를 입력하세요.");
			$("#sform #keyword").focus();
			return;
		}

		$("#sform").submit();
	},
	faq_move: function(k) {
		if($("#faq_input"+k).val() == "") {
			alert("질문할 내용을 입력하세요.");
			$("#faq_input"+k).focus();
			return;
		}
		$("#faq_form"+k).submit();
	}
}
var navi = {
	move: function(id) {
		var num = $("."+id).offset().top;
		$(window).scrollTop(num);
	},

	move_hid: function(id, gubun, hid) {
		if(gubun == "id") { var val = $("#"+id);	}
		else { var val = $("."+id);	}
		var num = val.offset().top;

		num = parseInt(num);
		if(hid == "") {
			hid = 50;
		} else {
			hid_temp = $("#"+hid).height();
			var hid = hid_temp;
			hid = parseInt(hid+170);
			//170
		}
		var final_hid = parseInt(num-hid);
		$(window).scrollTop(final_hid);
	}
}
//search//
var sh = {
	dateshow: function(val) {
		$("#"+val).datepicker('show');
	}
}
var rsv = {
	sclick: function(r_no, val) {
		var cnt = $("#rsv_s_list").find(".tb_on").length;
		if(cnt > 0) {
			var hdate	= $("#hseldate").val();
			var night	= $("#night").val();
			var person	= $("#person").val();
			var person_c = $("#person_c").val();
		}

		if(hdate == "undefined") {
			var hdate	= $("#prev_hseldate").val();
			alert(hdate);
		}



		$("#rsv_s_list tr").removeClass("select");
		$("#rsv_s_list tr[id$='_detail']").css("display", "none");
		$("#rsv_s_list tr[id$='_detail'] #cal_box").html("");

		$("#sang_"+r_no).prop("checked", true);
		$("#"+r_no+"_tr").addClass("select");
		
		if($("#res_type2").val() == "pinspot") {
			$(".hidden_info").attr("disabled", true);
		}
		
		//이미 있을 때
		if($("#"+r_no+"_detail").hasClass("tb_on") == true) {
			$("#"+r_no+"_detail").removeClass("tb_on");
			$("#"+r_no+"_detail #cal_box").html('');
		} else {

			$("#rsv_s_list tr[id$='_detail']").removeClass("tb_on");
			$("#"+r_no+"_detail").addClass("tb_on");
			$("#"+r_no+"_detail").css("display", "table-row");

			switch($("#res_type2").val()) {
				case "gpension":
					var target = "/reservation/gp_cal_info.php";
					break;
				
				case "expedia":
				case "expedia_a":
					var target = "/reservation/exp_cal_info.php";
					break;
				
				case "woori":
					var target = "/reservation/woori_cal_info.php";
					break;
				
				case "pinspot":
					var target = "/reservation/pinspot_cal_info.php";
					$("#sang_"+r_no+"_hidden").attr("disabled", false);
					break;
				
				case "hottel":
					var target = "/reservation/hottel_cal_info.php";
					break;
				
				case "yeogiya":
				case "monstay":
				case "ddnayo":
				case "yanolja":
					var target = "/reservation/yeogiya_cal_info.php";
					break;
					
				default:
				var target = "/reservation/cal_info.php";
					break;						
			}



			var string1 = $("#rform").serialize();
			var string2 = $("#prev_form").serialize();
			

			$.ajax({
				url : target,
				type : "post",
				data: string1+"&"+string2,
				success: function(data) {
					$("#"+r_no+"_detail #cal_box").html(data);
				},
			
				beforeSend: function() {
					$("#"+r_no+"_detail #cal_box").html("<div style=\"width:100%;text-align:center;margin:30px 0;height:300px;\"><p style=\"font-size:15px; line-height:3; color:#807f7f;padding-top:80px\">객실을 불러오고 있습니다...</p><img src=\"http://img.go.co.kr/icon_loading.gif\" alt=\"loading\" /></div>");
				},
				
				complete: function() {
					if(cnt > 0) {
						$("#hseldate").val(hdate);
						$("#night").val(night);
					}
					
					rsv.basedt_reset();
				}
			});	
		}
		
		if(val == 'y') {
			navi.move_hid(r_no+"_tr", "id", "topSearch");
		}
	},

	basedt_reset: function() {

		var p_no = $("#p_no").val();
		var r_no = $("input[name='sang']:checked").val();
		var hdate = $("#hseldate").val();

		if($("#type_channel").val() == "Y") {
			var target = "/reservation/exp_state.php";
			var datas = "mode=basedt_reset_abr&hotelid="+p_no+"&room_code="+r_no+"&prev_date="+hdate;
		} else {
			var target = "/reservation/state.php";
			var datas = "mode=basedt_reset&p_no="+p_no+"&r_no="+r_no+"&prev_date="+hdate+"&rcnt="+$("#room_cnt").val();
		}


		$.ajax({
			url : target,
			type: "post",
			data: datas,
			cache: false,
			success: function(data) {
				var sp = data.split("||");
				$("#base_ts").val(sp[0]);
				$("#hseldate").val(sp[1]);
				$("#nseldate").val(sp[2]);

				rsv.calender(sp[0], sp[1], sp[2]);
			}
		});
	},

	calender: function(ts, choice, nchoice) {
		var p_no	= $("#p_no").val();
		var r_no	= $("input[name='sang']:checked").val();
		var abr		= $("#abr_val").val();
		var res_type2 = $("#res_type2").val();

		if($("#type_channel").val() == "Y") {
			var target = "/reservation/exp_state.php";
			var datas = "mode=calender_abr&ts="+ts+"&p_no="+p_no+"&r_no="+r_no+"&abr_val="+abr+"&prev_date="+choice+"&next_date="+nchoice;
			var etc = "on";
		} else {
			var target = "/reservation/state.php";
			var datas = "mode=calender&ts="+ts+"&p_no="+p_no+"&r_no="+r_no+"&prev_date="+choice+"&next_date="+nchoice+"&rcnt="+$("#room_cnt").val();
			var etc = "";
		}
		
		$.ajax({
			type: "post",
			url: target,
			data: datas,
			success: function(data) {
				if(etc == "on") {
					$(".cal_sel").html(data);
				} else {
					$(".cal_section").html(data);
				}				
			},
			
			beforeSend: function() {
				if(etc == "on") {
					$(".cal_sel").html("<div style=\"width:100%;height:100%;margin:30px 0;text-align:center\"><p style=\"font-size:15px; line-height:3; color:#807f7f\">잠시만 기다려주세요...</p><img src=\"http://img.go.co.kr/icon_loading.gif\" alt=\"loading\" /></div>");
				} else {
					$(".cal_section").html("<div style=\"width:100%;height:100%;margin:30px 0;text-align:center\"><p style=\"font-size:15px; line-height:3; color:#807f7f\">잠시만 기다려주세요...</p><img src=\"http://img.go.co.kr/icon_loading.gif\" alt=\"loading\" /></div>");
				}
			},
			
			complete: function() {
				if(choice != "") {
					rsv.dchoice(choice);
				}
			}
		});
	},
	
	choice_over: function(id) {
		$(".calendar td").removeClass("pric_normal_ov2");
		$("#"+id).addClass("pric_normal_ov2");
	},

	dchoice: function(sdate) {
		var res_type2 = $("#res_type2").val();
		var etc = "";

		$("#hseldate").val(sdate);

		if($("#night").val() == null || $("#night").val() == "0") {
			$("#night").val(1);
			rsv.night_change(1);
		} else { 
			rsv.night_change($("#night").val());		
		}
	},

	night_change: function(nval) {
		var seld = $("#hseldate").val();
		var p_no = $("#p_no").val();
		var r_no = $("input[name='sang']:checked").val();
		var gubun = $("input[name='gubun']:checked").val();
		if(typeof gubun == 'undefined') {
			gubun =$("#gubun").val();
		}

		var res_type2 = $("#res_type2").val();

		if($("#type_channel").val() == "Y") {
			var etc = "on";
			var target = "/reservation/exp_state.php";
		} else {
			var etc = "";
			var target = "/reservation/state.php";
		}

		var md = "date_chk";
		var nval = parseInt(nval);
		if(nval == 0) {
			alert("이용박수를 선택하세요.");
			return;
		}

		var t_channel = $("#type_channel").val();

		$.ajax({
			url : target,
			type : "post",
			data : "mode="+md+"&sel="+seld+"&nval="+nval+"&p_no="+p_no+"&r_no="+r_no+"&rcnt="+$("#room_cnt").val(),
			cache : false,
			success: function(data) {
				
				var res = data.split("^^");
				if(res[2] == "tt_wait2") {
					alert("해당객실은 이용가능 날짜가 없습니다. 고객센터에 문의하세요.");
					return;
				} else if(res[2] == "tt_wait") {
					alert("숙박날짜중에 예약마감된 날짜가 포함되어 있습니다.");
					$("#night").val(1);
					rsv.night_change(1);
					return;
				}  else if(res[2] == "tt_wait4") {
					alert("요금이 등록되어 있지 않은 날짜가 포함되어 있습니다.");
					$("#night").val(1);
					rsv.night_change(1);
					return;
				} else {
					/* 여기다 스파 일수 추가*/
					if($("#pack_gubun").val() == "P") {
						rsv.adddate_setting();
					}
					/* 여기다 스파 일수 추가*/	
					$("#nseldate").val(res[1]);
					rsv.choice_check();

					if($("#res_type2").val() == "pinspot") {
						rsv.usetime_select();
					} else {
						if($("#single").val() == "on") {
							rsv.ticket_reload();
						} else {
							if(t_channel != "Y") {
								rsv.addsetting_change(p_no, $('#hseldate').val());
							}
							rsv.choice_check();
						}
					}

				}
				
				
				if(etc == "") {
					if(res[3] != "") {
						var selval = $("#rsv_s_list select[name='room_cnt']").val();
						$("#rsv_s_list select[name='room_cnt'] option").remove();
						for(mm = 1; mm <= res[3]; mm++) {
							$("#rsv_s_list select[name='room_cnt']").append("<option value='"+mm+"'>"+mm+"</option>");
						}
						$("#rsv_s_list select[name='room_cnt']").val($("#room_cnt").val());

						//if(parseInt(selval) <= parseInt(res[3])) {
						//	$("#rsv_s_list select[name='room_cnt']").val(selval);
						//}
					}
				}

			}
		});
	},
	
	adddate_setting: function() {
		var seld = $("#hseldate").val();
		var nval = $("#night").val();
		var sang = $("input[name='sang']:checked").val();

		$.ajax({
			url : "/reservation/state.php",
			type : "post",
			data : "mode=pack_adddate&sel="+seld+"&nval="+nval+"&sang="+sang,
			cache : false,
			success: function(data) {
				if(data == "") {
					alert("이용가능한 날짜가 없습니다. 다른 날짜를 선택하세요.");
					location.reload();
					return;
				} else {
					$(".pack_date").html(data);
					rsv.choice_check();
				}
			}
		});
	},
	
	ticket_reload: function() {
		$.ajax({
			url : "/reservation/state.php",
			type : "post",
			data : "mode=ticket_reload&p_no="+$("#p_no").val()+"&sang="+$("input[name='sang']:checked").val()+"&sel_date="+$("#hseldate").val(),
			cache: false, 
			success: function(e) {
				$(".ticket_table").find(".ticket_row").remove();
				$(".ticket_table").find("tr:last").after(e);
				booking.choice_check();
			}
		});
	},

	cal_over: function(id) {
		$("#"+id).addClass("pric_normal_ov");
	},

	cal_out: function(id) {
		$(".calendar td").removeClass("pric_normal_ov");
	},

	choice_submit3: function(total_m) {
		if($("#night").val() == "" || $("#night").val() == 0) {
			alert("이용박수를 선택하세요.");
			$("#night").focus();
			return;
		}

		if($("#person").val() == "선택") {
			alert("인원수를 선택하세요.");
			$("#person").focus();
			return;
		}

		if($("#person_c").val() == "선택") {
			alert("인원수를 선택하세요.");
			$("#person_c").focus();
			return;
		}
		
		var person = parseInt($("select[name='person']").val());
		var person_c = parseInt($("select[name='person_c']").val());
		var total = parseInt(person + person_c);
		
		if(total_m != "") {
			if(total > parseInt(total_m)) {
				alert("최대인원은 "+total_m+"명 입니다.");
				rsv.prev_layeroff();
				return;
			} 
		}

		$("form[name='rform']").submit();
	},

	choice_submit2: function() {
		$("form[name='rform']").submit();
	},

	addsetting_change: function(p_no, hseldate) {
		$.ajax({
			url : "/reservation/state.php",
			type : "post", 
			data: "mode=addsetting&p_no="+p_no+"&hseldate="+hseldate,
			success: function(e) {
				$("#add_select").html(e);	
				rsv.choice_check();
			}
		});
	},

	pack_click: function(pack_no, gubunid, gubun) {
		var trid = $("#"+gubunid+"_"+pack_no+"_tr");
		var inputid = $("#"+gubunid+"_"+pack_no);
		
		if(trid.hasClass("tron") == true) {
			trid.removeClass("tron");
			trid.hide();
			inputid.prop("checked", false);

			$("#"+gubunid+"_"+pack_no+"_tr select").attr("disabled", true);
		} else {
			trid.addClass("tron");	
			trid.show();
			inputid.prop("checked", true);

			$("#"+gubunid+"_"+pack_no+"_tr select").attr("disabled", false);
		}

		if(gubun == "mobile") {
			go_price_calc();
		} else {
			rsv.choice_check();
		}
	},
	
	choice_check: function() {
		
		
		var res_type2 = $("#res_type2").val();

		if($("#type_channel").val() == "Y") {
			var etc = "on";
			var target = "/reservation/exp_state.php";
		} else {
			var etc = "";
			var target = "/reservation/state.php";
		}



		var string = $("#rform").serialize();	
		$(".calendar td").removeClass("pric_normal_ov2");

		rsv.choice_over2('date_'+$("#hseldate").val());
		if($("#single").val() != "on") {
			rsv.choice_over2('date_'+$("#nseldate").val());

			var clas = $("#date_"+$("#hseldate").val()).attr("class");
			//alert(clas);
			var exple = clas.split("ov_");
			var exple2 = exple[1].split(" ");
			
			var ep = parseInt(exple2[0]);
			//exple2[0] 사용
			var nt = parseInt($("#night").val());
			var addstr = "";
			for(i = 1;i <= nt;i++) {
				var next = "ov_"+parseInt(ep+i);
				rsv.choice_over3(next);	
			}
		}
		
		$.ajax({
			url : target,
			type:"post",
			data: "mode=choice_check&"+string,
			cache: false,
			success: function(data) {
				$(".cal_result").html(data);
				if(res_type2 == "expedia" || res_type2 == "expedia_a") {
					if($("#hidden_policy").text() != "") {
						$("#cancel_policy_box").show();
						$(".cancel_policy").html($("#hidden_policy").text());
					} else {
						$("#cancel_policy_box").hide();
					}

					if($("#hidden_check").text() != "") {
						$("#checkin_policy_box").show();
						$(".checkin_policy").html($("#hidden_check").html());
					} else {
						$("#checkin_policy_box").hide();
					}
				}
			},
			
			beforeSend: function() {
				$(".cal_result").html("<div id='loding_img2' style='position:absolute;background:#ffffff;width:273px;min-height:200px;margin-left:1px;z-index:3;text-align:center;padding-top:150px'><p style=\"font-size:15px; line-height:3; color:#807f7f\">잠시만 기다려주세요...</p><img src=\"http://img.go.co.kr/icon_loading.gif\" alt=\"loading\" /></div>");
			}
		});
	}, 

	choice_over2: function(id) {
		$("#"+id).addClass("pric_normal_ov2");
	},
	
	choice_over3: function(id) {
		$("."+id).addClass("pric_normal_ov2");
	},

	closebt: function(id) {
		$("#"+id).css("display", "none");
	},

	final_chk: function(pno, login_chk) {
		$.ajax({
			url : "/reservation/state.php",
			type : "post",
			data: "mode=final_chk&pno="+pno,
			success: function(data) {
				var res = data.split("||");
				if(res[0] == "no") {
					alert(res[1]);
					location.href=res[2];
					return;
				} else {
					switch(login_chk) {
						case "pay":		
							pay.payment_submit($("#_uflag").val(), $("#_res_type2").val());
							break;
						case "mobile_login":		
							pay.rstep1();
							break;
						case "mobile_no_login":		
							pay.prev_nlogin2('', '');
							break;
						case "login":		
							rsv.choice_submit3('');	
							break;
						
						case "mobile_pay2":
							$("#payform").submit();
							break;

						default:		
							pay.prev_nlogin2('', '');
							break;

					}
				}
			}
		});
	},
	room_cnt: function(rnum, gubun) {
		
		if(gubun == 'web') {
			var pt = $(".cbox:last");
			var pt_len = $(".cbox").length;

			var cur = parseInt(pt_len)+1;
			var mi = rnum;
			
			if(cur < mi || cur == mi) { 
				var clo = "";
				//$(".pb").remove();
				for(i = cur; i <= mi; i++) {
					clo = pt.clone(true);
					clo.attr("id", "cbox_"+i);
					clo.find(".pb").attr("id", "person_box_"+i);
					clo.find("select[name='person[]']").attr("id", "person"+i);
					clo.find("select[name='person_c[]']").attr("id", "person_c"+i);
					clo.find(".cnum_cla").remove();
					$(".cbox:last").after(clo);
				}
			} else if(cur > mi){
				for(i = cur; i > mi; i--) {
					$(".person_box"+i).remove();
					$("#cbox_"+i).remove();				
				}
			}

			rsv.choice_check();
		} else if(gubun == 'mobile') {
			var pt = $(".cbox:last");
			var pt_len = $(".cbox").length;

			var cur = parseInt(pt_len)+1;
			var mi = rnum;
			
			if(cur < mi || cur == mi) { 
				var clo = "";
				//$(".pb").remove();
				for(i = cur; i <= mi; i++) {
					clo = pt.clone(true);
					clo.attr("id", "cbox_"+i);
					clo.find(".pb").attr("id", "person_box_"+i);
					clo.find("select[name='person[]']").attr("id", "person"+i);
					clo.find("select[name='person_c[]']").attr("id", "person_c"+i);
					clo.find(".cnum_cla").remove();
					$(".cbox:last").after(clo);
				}
			} else if(cur > mi){
				for(i = cur; i > mi; i--) {
					$(".person_box"+i).remove();
					$("#cbox_"+i).remove();				
				}
			}

			rsv.mchoice_check();
		}
	},
	usetime_select: function() {
		
		var seld = $("#hseldate").val();
		var p_no = $("#p_no").val();
		var sang = $("input[name='sang']:checked").val();

		$.ajax({
			url : "/reservation/state.php",
			data: "mode=usetime_select&date="+seld+"&pno="+p_no+"&rno="+sang,
			type : "post",
			success: function(e) {
				$("#time_td").html(e);
				
				rsv.timelabel();

				rsv.choice_check();
			}
		});
	},
	timelabel: function() {
		var in_time		= $("#in_time").val();
		var out_time	= $("#out_time").val();
		
		if(typeof in_time != "undefined") {
			var in_time_str = $("#in_time option:selected").text();
		} else {
			var in_time_str = "";
		}

		if(typeof out_time != "undefined") {
			var out_time_str = $("#out_time option:selected").text();
		} else {
			var out_time_str = "";
		}

		if(in_time_str != "" && out_time_str == "") {
			var tmp = in_time.split("||");
			if(parseInt(tmp.length) > 1) {
				alert(tmp[1]);
			}

			$("#time_label").val(in_time_str);
		} else {
			$("#time_label").val(in_time_str+"~"+out_time_str);
		}
	}
}

var pay = {

	prev_nlogin2: function(total_m, add_val) {
		if($("#night").val() == "" || $("#night").val() == 0) {
			alert("이용박수를 선택하세요.");
			$("#night").focus();
			return;
		}

		if($("#person").val() == "선택") {
			alert("인원수를 선택하세요.");
			$("#person").focus();
			return;
		}

		if($("#person_c").val() == "선택") {
			alert("인원수를 선택하세요.");
			$("#person_c").focus();
			return;
		}
		
		var person = parseInt($("select[name='person']").val());
		var person_c = parseInt($("select[name='person_c']").val());
		var total = parseInt(person + person_c);
		
		if(total_m != "") {
			if(total > parseInt(total_m)) {
				alert("최대인원은 "+total_m+"명 입니다.");
				return;
			} 
		}

		$("#rform").attr("action", "http://"+base_url+"/reservation/preserve_nlogin.php?md=WQwlVQ=="+add_val);
		$("#rform").submit();
	},

	pay_submit : function(gubun, res_type) {
		
		if(!$("#reserve_name").val()){
			alert("성명을 입력해주세요.");
			$("#reserve_name").focus();
			return;
		}
		
		if(gubun == "web") {
			if(!$("#stayname").val()){
				alert("투숙자명 입력해주세요.");
				$("#stayname").focus();
				return;
			}
		}

		if(!$("#tel1").val()){
			alert("연락처를 입력해주세요.");
			$("#tel1").focus();
			return;
		}

		if(!$("#tel2").val()){
			alert("연락처를 입력해주세요.");
			$("#tel2").focus();
			return;
		}

		if(!$("#tel3").val()){
			alert("연락처를 입력해주세요.");
			$("#tel3").focus();
			return;
		}

		if(!$("#email1").val()){
			alert("이메일을 입력해주세요.");
			$("#email1").focus();
			return;
		}

		if(!$("#email2").val()){
			alert("이메일을 입력해주세요.");
			$("#email2").focus();
			return;
		}

		var bank_on = "off";

		if($("input[name='pay_type']:checked").val() == 'va') {
			var bank_on = "on";
		}

		if(bank_on == 'on') {
			if(!$("#refund_bank").val()){
				alert("은행명을 입력해주세요.");
				$("#refund_bank").focus();
				return;
			}

			if(!$("#refund_name").val()){
				alert("예금주명을 입력해주세요.");
				$("#refund_name").focus();
				return;
			}

			if(!$("#refund_number").val()){
				alert("계좌번호을 입력해주세요.");
				$("#refund_number").focus();
				return;
			}

		}

		var mgubun = $("#_mgubun").val();
		if(mgubun == "member") {
			if($("#cancel1").is(":checked") == false) {
				alert("취소 및 환불규정에 동의해주세요.");
				$("#cancel1").focus();
				return;
			}

			if($("#cancel2").is(":checked") == false) {
				alert("개인정보 제3자제공에 동의해주세요.");
				$("#cancel2").focus();
				return;
			}
		} else {
			if($("#cancel1").is(":checked") == false) {
				alert("취소 및 환불규정에 동의해주세요.");
				$("#cancel1").focus();
				return;
			}

			if($("#cancel2").is(":checked") == false) {
				alert("개인정보 수집에 동의해주세요.");
				$("#cancel2").focus();
				return;
			}

			if($("#cancel3").is(":checked") == false) {
				alert("개인정보 제3자제공에 동의해주세요.");
				$("#cancel3").focus();
				return;
			}
		}

		var email_host = /^((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		if(email_host.test($("#email2").val()) == false){
			alert("이메일 형식에 맞게 입력해주세요.");
			$("#email2").focus();
			return;
		}

		
		if($("#memo").val() == '[도착예정시간 / 차량소지여부]') {
			$("#memo").val('');
		}
		
	ww = window.open("", "payment", "toolbar=no,scrollbars=no,directories=no,status=no,menubar=no,width=400,height=650,resizable=yes, top=50, left="+((screen.width - 450)/2)+"");
	$("form[name='rent_fix']").attr({"target": "payment", "action": "http://pay.gobs.co.kr/pay_total.php"}).submit();
	ww.focus();
	},


	// 신규 결제
	payment_submit : function(gubun, res_type,fgubun) {
		if(gubun == "web") {
			/*if(!$("#reserve_name").val()){
				alert("예약자명을 입력해주세요.");
				$("#reserve_name").focus();
				return;
			}*/
			if(!$("#stayname").val() && fgubun == "R"){
				alert("투숙자명 입력해주세요.");
				$("#stayname").focus();
				return;
			}

		} else { //모바일
			if(!$("#reserve_name").val()){
				alert("투숙자명 입력해주세요.");
				$("#reserve_name").focus();
				return;
			}
			$("#stayname").val($("#reserve_name").val());
		}
		
		if(res_type == "expedia_a") {
			var j = 0;
			var j2 = 0;
			
			$("input[name='first[]']").each(function(i) {
				if($("input[name='first[]']").eq(i).val() != "") {
					j++;	
				}
			});

			$("input[name='last[]']").each(function(i) {
				if($("input[name='last[]']").eq(i).val() != "") {
					j2++;
				}
			});

			if(j == 0) {
				alert("투숙자명(영문)을 입력해주세요.");	
				$("input[name='first[]']").eq(0).focus();
				return;
			}
			
			if(j2 == 0) {
				alert("투숙자명(영문)을 입력해주세요.");	
				$("input[name='last[]']").eq(0).focus();
				return;
			}
		}
		
		//웹, 모바일 디자인 나뉘면서 분기
		if(gubun == "web") {
			if(!$("#tel1").val()){
				alert("연락처를 입력해주세요.");
				$("#tel1").focus();
				return;
			}

			if(!$("#tel2").val()){
				alert("연락처를 입력해주세요.");
				$("#tel2").focus();
				return;
			}

			if(!$("#tel3").val()){
				alert("연락처를 입력해주세요.");
				$("#tel3").focus();
				return;
			}

			if(!$("#email1").val()){
				alert("이메일을 입력해주세요.");
				$("#email1").focus();
				return;
			}

			if(!$("#email2").val()){
				alert("이메일을 입력해주세요.");
				$("#email2").focus();
				return;
			}

			var email_host = /^((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
			if(email_host.test($("#email2").val()) == false){
				alert("이메일 형식에 맞게 입력해주세요.");
				$("#email2").focus();
				return;
			}
		} else {
			if(!$("#tel").val()){
				alert("연락처를 입력해주세요.");
				$("#tel").focus();
				return;
			}

			if(!$("#email").val()){
				alert("이메일을 입력해주세요.");
				$("#email").focus();
				return;
			}
		}

		var bank_on = "off";
		if($("input[name='pay_type']:checked").val() == 'va') {
			var bank_on = "on";
		}

		if(bank_on == 'on') {
			if(!$("#refund_bank").val()){
				alert("은행명을 입력해주세요.");
				$("#refund_bank").focus();
				return;
			}

			if(!$("#refund_name").val()){
				alert("예금주명을 입력해주세요.");
				$("#refund_name").focus();
				return;
			}

			if(!$("#refund_number").val()){
				alert("계좌번호을 입력해주세요.");
				$("#refund_number").focus();
				return;
			}
		}

		var mgubun = $("#_mgubun").val();
		if($("#_first").val() == "on") {
			if($("#cancel3").is(":checked") == false) {
				alert("이용약관에 동의해주세요.");
				$("#cancel3").focus();
				
				if($("#allchk").is(":checked") == false) {
					$("#allchk").prop("checked", true);
				}
				$("input[id^='cancel']").each(function(i) {
					if($("input[id^='cancel']").eq(i).is(":checked") == false) {
						$("input[id^='cancel']").eq(i).prop("checked", true);
					}
				});
			
				return;
			}
			/*
			if($("#cancel4").is(":checked") == false) {
				alert("개인정보취급방침에 동의해주세요.");
				$("#cancel4").focus();
				
				if($("#allchk").is(":checked") == false) {
					$("#allchk").prop("checked", true);
				}
				$("input[id^='cancel']").each(function(i) {
					if($("input[id^='cancel']").eq(i).is(":checked") == false) {
						$("input[id^='cancel']").eq(i).prop("checked", true);
					}
				});

				return;
			}*/

			if($("#cancel1").is(":checked") == false) {
				alert("취소 및 환불규정에 동의해주세요.");
				$("#cancel1").focus();
				if($("#allchk").is(":checked") == false) {
					$("#allchk").prop("checked", true);
				}
				$("input[id^='cancel']").each(function(i) {
					if($("input[id^='cancel']").eq(i).is(":checked") == false) {
						$("input[id^='cancel']").eq(i).prop("checked", true);
					}
				});
				return;
			}

			if($("#cancel2").is(":checked") == false) {
				alert("개인정보 제3자제공에 동의해주세요.");
				$("#cancel2").focus();
				if($("#allchk").is(":checked") == false) {
					$("#allchk").prop("checked", true);
				}
				$("input[id^='cancel']").each(function(i) {
					if($("input[id^='cancel']").eq(i).is(":checked") == false) {
						$("input[id^='cancel']").eq(i).prop("checked", true);
					}
				});
				return;
			}
		}
		
		if(gubun == "web") {
			if($("input[name='pay_type']:checked").val() == 'bank') {
				$("form[name='rent_fix']").attr("action", "./state.php").submit();
			} else {
				//변경사유 ./state에
				$.ajax({
					type	:	"POST",
					data	:	$("form[name='rent_fix']").serialize(),
					url		:	"/reservation/state.php",
					success	:	function(e) {
						$("#script_div").html(e);
					}
				});
				ww = window.open("", "payment", "toolbar=no,scrollbars=no,directories=no,status=no,menubar=no,width=400,height=650,resizable=yes, top=50, left="+((screen.width - 450)/2)+"");
				//$("form[name='rent_fix']").attr({"target": "payment", "action": "http://pay."+base_url2+"/pay_total.php"}).submit();
				//$("form[name='rent_fix']").attr({"target": "payment", "action": "http://www."+base_url2+"/reservation/pay_total.php"}).submit();
				$("form[name='rent_fix']").attr({"target": "payment", "action": "http://"+base_url2+"/reservation/pay_total.php"}).submit();
				ww.focus();
			}
		} else {
			$("form[name='rent_fix']").submit();
		}
	}
}

var mb = {
cancel_div: function(dclass) {
		if($("."+dclass).hasClass("on") == true) {
			$("."+dclass).removeClass("on");
			$("."+dclass).slideUp("300");
			$("."+dclass).hide();
		} else {
			
			$("."+dclass).addClass("on");
			$("."+dclass).slideDown("300");
			$("."+dclass).show();
			
		}
	}
}
var util = {
	checknum: function(field, next, cnt) {
		var len = $("input[name='"+field+"']").val().length;
		if(len > cnt) {
			$("input[name='"+next+"']").focus();
		}
	},
	checktype: function(type, field) {
		if (!(event.keyCode >=37 && event.keyCode<=40)) {
			if(type == "en2") {
				var inputVal = $("#"+field+"").val();
			} else {
				var inputVal = $("input[name='"+field+"']").val();
			}
			switch(type) {
				case "email1":
					$("input[name='"+field+"']").val(inputVal.replace(/[^a-z0-9\-_]/gi,''));
					break;
				
				case "email2":
					$("input[name='"+field+"']").val(inputVal.replace(/[^a-z0-9\.]/gi,''));
					break;
				
				case "en":		//영문소문자와 숫자만
					$("input[name='"+field+"']").val(inputVal.replace(/[^a-z0-9]/gi,''));
					break;
				
				case "en2":		//영문소문자와 숫자만
					$("#"+field+"").val(inputVal.replace(/[^a-z]/gi,''));
					break;

				case "number":
					$("input[name='"+field+"']").val(inputVal.replace(/[^0-9]/gi,''));
					break;
				
				case "kor":
					$("input[name='"+field+"']").val(inputVal.replace(/[^ㄱ-힣\.]/gi,''));
					break;
				
				case "pw":		//영문소문자, 대문자, 숫자, 특수문자
					$("input[name='"+field+"']").val(inputVal.replace(/[^a-zA-Z0-9]/gi,''));
					break;
				
				case "kor2":
					$("input[name='"+field+"']").val(inputVal.replace(/[^ㄱ-힣a-zA-Z]/gi,''));
					break;
				
			}
		}
	},

	basic_l_on: function(obj) {
		if($("#"+obj).hasClass("on") == true) {
			$("#"+obj).removeClass("on");
			$("#"+obj).hide();
		} else {
			$("#"+obj).addClass("on");
			$("#"+obj).show();
		}
	},
	textchk: function(val) {
		if(val == '[도착예정시간 / 차량소지여부]') {
			$("#memo").val('');
		}
	},
	emailsel: function(val) {
		if(val == "dr") {
			$("#email2").val("");
			$("#email2").show();
		} else {
			$("#email2").val(val);
		}
	},
	on:	function(obj){
		var a = (obj == "#pop") ? 300 : ($(window).height() - $(obj).height()) / 2;
		var b = ($(window).width() - $(obj).width()) / 2;

		switch(obj) {
			case "#pay_discount_pop":
				a = a+300;
				break;
			
			case "#mailing_pop_wrap":
			case "#call_pop_wrap":
			case "#call_pop_wrap1":
			case "#loadcard":
			case "#zippop":
				a = $(obj).offset().top;
				a = a+300;
				break;
			
			case "#agreement_pop":
			case "#privacy_pop":
				a = 0;
				break;
			
			case "#pop_call":
				a = 50;
				break;
			
			default:
				a = a;
				break;
		}
		
		var arrPageSizes = ___getPageSize();
		$("body").append("<div id=\"overlay\"></div>");
		if(obj == "#menu_bg") {
			$("#overlay").css({"background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":$(window).height()});

		} else {
			$("#overlay").css({"top":"0", "position":"fixed", "background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":arrPageSizes[1]});
		}
		$(obj).css({"top": a, "left": b, "z-index": 20 }).show();
	},

	out: function(obj){
		$("#overlay").slideUp(function(){ $("#overlay").remove(); });
		$(obj).hide();
		switch(obj) {
			case "#mailing_pop_wrap":
				$(".mpop2").hide();
				$(".mpop1").show();
				break;
			
			case "#menu_bg":
				$(window).unbind("touchmove");
				break;
		}
	}

}
function select_pay() {
	if($("#username").val() == "" || $.trim($("#username").val()) == "") {
		alert("예약자명를 입력하세요.");
		$("#username").focus();
		return;
	}
	if($("#email").val() == "" || $.trim($("#email").val()) == "") {
		alert("이메일을 입력하세요.");
		$("#email").focus();
		return;
	}
		$("#sel_pay").submit();
}
function select_pay_day(name, mail, day) {
	$.ajax({
			url : "./state.php",
			type : "post",
			data: "mode=select_pay&name="+name+"&email="+mail+"day="+day,
			success: function(re) {
				alert('a');
			}
	});
}

var mem = {
	va_sms : function() {
		var string = $("#va_form").serialize();
		$.ajax({
			type: "post",
			url : "./state.php",
			data : string,
			success: function(e) {
				alert(e);
			}
		});
	},
	receipt: function(num) {
		var url = "./receipt.php?num="+num;
		window.open(url, "receipt", "width=400, height=500");
	},
	
	receipt2: function(num) {
		var url = "./receipt2.php?num="+num;
		window.open(url, "receipt", "width=400, height=700");
	},
	rsv_voucher: function(num) {
		var url = "./hotel_voucher.php?rnum="+num;
		var pop_nvl = window.open(url, "rsv_voucher", "scrollbars=yes, width=795, height=942");
	}
}

var utils = {
	img_on:	function(obj){
		var a = ($(window).height() - $(obj).height()) / 2;
		var b = ($(window).width() - $(obj).width()) / 2;

		var arrPageSizes = ___getPageSize();
		$("body").append("<div id=\"overlay\"></div>");

		//	$("#overlay").css({"background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":arrPageSizes[1]});

		$("#overlay").css({"z-index":"999", "top":"0", "position":"fixed", "background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":arrPageSizes[1]});

		$(obj).css({"top": a, "left": b, "z-index": "99999" }).show();
		$("#quickMenu2").hide();
		$("#topSearch").css("z-index", "1");
	},

	out: function(obj){
		$("#overlay").slideUp(function(){ $("#overlay").remove(); });
		$(obj).hide();
		switch(obj) {
			case "#mailing_pop_wrap":
				$(".mpop2").hide();
				$(".mpop1").show();
				break;			
			
			case "#menu_bg":
			case "#pop_call":
			case "#summer_box":
				$(window).unbind("touchmove");
				break;
			
			default:
				$(window).unbind("touchmove");
				break;
		}
		$("#top_box").css("z-index", "9999");
		$("#topSearch").css("z-index", "9999");
	},
	pop_open: function(url, name, option) {
		var ww = window.open(url, name, "toolbar=no,scrollbars=no,directories=no,status=no,menubar=no,width=700,height=300,resizable=yes, top=50, left="+((screen.width - 450)/2)+"");
		ww.focus();
	},
	move_hid: function(id, gubun, hid) {
		if(gubun == "id") { var val = $("#"+id);	}
		else { var val = $("."+id);	}
		var num = val.offset().top;

		num = parseInt(num);
		if(hid == "") {
			hid = 50;
		} else {
			hid_temp = $("#"+hid).height();
			var hid = hid_temp;
			hid = parseInt(hid+170);
		}
		var final_hid = parseInt(num-hid);
		$(window).scrollTop(final_hid);
	},

	inst_fchk: function(formname, submit_gubun, func) {
		//formname form 아이디값 입력

		var valid = true;
		var form = $("#"+formname);
		
		//form 내에서 유효성 체크할것만  input이나 textarea, select에 validation = 'yes' 추가
		var mailchk		= ["email2"];		//이메일 뒷자리 형식 체크할 input 이름만 배열로 추가
		var chk_field	= ["uidchk", "OTP_chk"];
		form.find('input, textarea, select, checkbox').each(function(key) {
			var obj = $(this);
			if(obj.attr('validation') == 'yes') {
				
				if(util.is_empty(obj)) {
					if(obj.attr("type") == "checkbox") {
						alert(obj.prop('title') + '을(를) 확인하세요.');
					} else {
						alert(obj.prop('title') + '을(를) 입력하세요.');
					}
					obj.focus();
					valid = false;
					return false;
				} else {
					if($.inArray(obj.prop('name'), mailchk) >= 0) {
						if(utils.is_emailchk(obj.val())) {
							alert('형식에 맞게 입력하세요.');
							obj.focus();
							valid = false;
							return false;
						}
					} else if($.inArray(obj.prop('name'), chk_field) >= 0) {
						if(utils.is_chk(obj.val())) {
							alert(obj.prop('title')+' 확인을 해주세요.');
							obj.focus();
							valid = false;
							return false;
						}
					}
				}
			}
		});

		if(valid == true) {
			switch(submit_gubun) {
				case "func":
					func();
					break;

				case "submit":
					$("#"+formname).submit();
					break;

				default:
					return true;
					break;

			}

		} else {
			return false;
		}
	},
	on:	function(obj){
		var a = ($(window).height() - $(obj).height()) / 2;
		var b = ($(window).width() - $(obj).width()) / 2;

		switch(obj) {
			case "#pop_pay_point":
				a = a;
				break;
			case "#pay_discount_pop":
				a = "100px";
				break;
			case "#mailing_pop_wrap":
			case "#call_pop_wrap":
			case "#call_pop_wrap1":
			case "#loadcard":
			case "#zippop":
				a = $(obj).offset().top;
				a = a+300;
				break;
			
			case "#agreement_pop":
			case "#privacy_pop":
			case "#pop_app":
				a = 0;
				break;
			
			case "#pop_call":
			case "#server_pop":
			case "#summer_box":
				a = "15%";
				$(window).scrollTop(0);
				$(window).bind("touchmove", function(e) { e.preventDefault(); });
				break;
			
			default:
				a = a;
				$(window).scrollTop(0);
				$(window).bind("touchmove", function(e) { e.preventDefault(); });
				break;
		}
		
		var arrPageSizes = ___getPageSize();
		$("body").append("<div id=\"overlay\"></div>");
		if(obj == "#menu_bg") {
			$("#overlay").css({"background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":$(window).height()});
		} else {
		//	$("#overlay").css({"background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":arrPageSizes[1]});
			$("#overlay").css({"z-index":"999", "top":"0", "position":"fixed", "background-color":"#000", "opacity":"0.7", "width":arrPageSizes[0], "height":arrPageSizes[1]});
		}
		$(obj).css({"top": a, "left": b, "z-index": 99999 }).show();
		$("#top_box").css("z-index", "5");
	},
	appbn: function(gubun, obj) {
		
		pop = "chk_y";
		$.cookie("pop_mob", pop, {path : '/'});
		$("#"+obj).css("display", "none");
		
		$(".subMenu").css("top", "193px");
	},
	
	app_layer: function(obj) {
		if($("#"+obj).hasClass("on") == true) {
			$("#"+obj).removeClass("on");
			$("#"+obj).hide();	
			$("#bannertop_btn").attr("src", "http://img.go.co.kr/bn_app01.jpg");
		} else {
			$("#"+obj).addClass("on");
			$("#"+obj).show();
			$("#bannertop_btn").attr("src", "http://img.go.co.kr/bn_app02.jpg");
		}
	},
	
	app_layer_new: function(obj, ad_val) {
		if($("#"+obj).hasClass("on") == true) {
			$("#"+obj).removeClass("on");
			$("#"+obj).hide();	
			$("#bannertop_btn").attr("src", "http://img.go.co.kr/bn_app01.jpg");
			$("#bannertop_btn2").attr("src", "http://img.go.co.kr/bn_app01.jpg");
			
			$("#bannertop_btn").show();
			$("#bannertop_btn2").hide();

			if(ad_val == "Y") {
				pop = "Y";
				$.cookie("pop_lclose", pop, {path : '/'});
			}
		} else {
			$("#"+obj).addClass("on");
			$("#"+obj).show();

			$("#bannertop_btn").attr("src", "http://img.go.co.kr/bn_app02.jpg");
			$("#bannertop_btn2").attr("src", "http://img.go.co.kr/bn_app02.jpg");
			
			$("#bannertop_btn").hide();
			$("#bannertop_btn2").show();
		}
	}
}

var mc = {
	mile_use: function(fprice) {
		var imile = $("#use_mileage").val();
		var coupon = $("#my_coupon").val();
		
		$.ajax({
			type: "post",
			url : "./state.php",
			data: "mode=mc_calc&imile="+imile+"&coupon="+coupon+"&final_price="+fprice,
			cache: false,
			success: function(e) {
				var res = e.split("||");
				
				if(res[0] == "N") {
					alert(res[1]);
					$("#use_mileage").val("0");
					mc.mile_use(fprice);
					return;
				} else if(res[0] == "N2") {
					alert(res[1]);
					$("#my_coupon").val("");
					mc.mile_use(fprice);
					return;
				} else {
					//잔여적립금
					$("#after_mile").text(number_format(res[0]));

					//쿠폰할인금액
					$("#after_coupon").text(number_format(res[1]));

					//적립금/쿠폰할인금액
					$("#mile_price").text(number_format(res[2]));

					//실제결제금액
					$("#final_price2").text(number_format(res[3]));

					$("#mcinfo_hidden").val(res[4]);
					$("#mcprice_hidden").val(res[3]);
				}
			}
		});
	}

}