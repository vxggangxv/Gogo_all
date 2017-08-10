$(function(){
	var scroll = $(window).scrollTop();
	if (scroll >= $('.seoulpark_intro_tab').offset().top)
	{
		$('.sp_guide_right_banner').show();
		$('.sp_guide_right_banner01').show();
		$('.sp_guide_right_banner02').show();
		$('.sp_guide_right_banner03').show();
	}else
	{
		$('.sp_guide_right_banner').hide();
		$('.sp_guide_right_banner01').hide();
		$('.sp_guide_right_banner02').hide();
		$('.sp_guide_right_banner03').hide();
	}
	$(window).scroll(function(){
		scroll = $(window).scrollTop();
		if (scroll >= $('.seoulpark_intro_tab').offset().top)
		{
			$('.sp_guide_right_banner').show();
			$('.sp_guide_right_banner01').show();
			$('.sp_guide_right_banner02').show();
			$('.sp_guide_right_banner03').show();
		}else
		{
			$('.sp_guide_right_banner').hide();
			$('.sp_guide_right_banner01').hide();
			$('.sp_guide_right_banner02').hide();
			$('.sp_guide_right_banner03').hide();
		}
		if (scroll >= $('#seoulpark_intro_img01').offset().top)
		{
			$('.sp_guide_right_banner01').hide();
			$('.sp_guide_right_banner02').show();
			$('.sp_guide_right_banner03').show();
		}
		if (scroll >= $('#seoulpark_intro_img02').offset().top)
		{
			$('.sp_guide_right_banner01').show();
			$('.sp_guide_right_banner02').hide();
			$('.sp_guide_right_banner03').show();
		}
		if (scroll >= $('#seoulpark_intro_img03').offset().top)
		{
			$('.sp_guide_right_banner01').show();
			$('.sp_guide_right_banner02').show();
			$('.sp_guide_right_banner03').hide();
		}
	});
});