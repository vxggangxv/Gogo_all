$(function () {
	//파일박스 꾸미기
	fileAction();

	function fileAction() {
		$fileBox = $(".input-file");
		fileLoad();
	};

	function fileLoad() {
		$.each($fileBox, function (idx) {
			var $this = $fileBox.eq(idx),
				$btnUpload = $this.find('[type="file"]'),
				$label = $this.find('.file-label');
			$btnUpload.on('change', function () {
//				var $target = $(this),
//					filename = $target.val(),
//					$fileText = $target.siblings('.file-name');
				
				var $fileText = $(this).siblings('.file-name');
				if (window.FileReader) { // modern browser 
					var filename = $(this)[0].files[0].name;
				} else { // old IE 
					var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
				}
				$fileText.val(filename);
			});
			$btnUpload.on('focusin focusout', function (e) {
				e.type == 'focusin' ? $label.addClass('file-focus') : $label.removeClass('file-focus');
			})
		})
	}
	
	// 글쓰기 답글 기능
	$("#replyList").on("click", ".s-rep", function() {
		$(this).hide().siblings().show();
		var inHtml = '<li class="replyWrite-in clr">'
				+	'<textarea name="" id="" cols="30" rows="4"></textarea><a href="javascript:;" class="btn a-enroll">등록</a>'
				+	'</li>' ;
		$(this).closest('li').after(inHtml);
	});
	$("#replyList").on("click", ".s-repDlt", function() {
		$(this).hide().siblings().show();
		if ($(this).closest('li').next().hasClass('replyWrite-in')) {
			$(this).closest('li').next().remove();
		}
		
	});

	$("#replyList").on('click', '.s-dlt', function() {
		$(this).closest('li').remove();
	});
	var $replyWriteOut = $("#replyArea .replyWrite-out");
	$replyWriteOut.find(".a-enroll").on('click', function() {
//		console.log('hi');
		console.log($replyWriteOut.find('textarea').val());
		
	});


});