$( function () {
 
    /*차트 애니메이션 함수 실행*/
    activeInfo();
    
    
	/*함수 정의*/
    function activeInfo () {
        
        var $content    = $( '#info-content' ),
            $charts     = $content.find( '.chart' );
        
        
        /*컨텐츠가 오른쪽에서 나오는 애니메이션*/
		/*
        $content.stop(true).animate( { 
            right: 0 
        }, 1200 );
        */
        
        /*원형 차트 처리*/
        $charts.each( function () {
            
            var $chart  = $( this ),
                $circleTop= $chart.find( '.top .circle-inner')
                                    .css( { transform: 'rotate(0)' } ),
				/*
                $circleBottom = $chart.find( '.bottom .circle-inner' )
                                    .css( { transform: 'rotate(0)' } ),
				*/
                /*백분율 값 가져오기*/
                $percentNumber  = $chart.find( '.percent-number' ),
                percentData     = $percentNumber.text();
            
            /*백분율 값의 초기값 지정*/
            $percentNumber.text( 0 );
            
            
            /*각도 애니메이션*/
            $( { percent: 0 } ).delay( 1000 ).animate( {
                percent: percentData
            }, {
                duration: 1500,
                progress: function () {
                    var now      = this.percent,
                        deg      = now * 180 / 100,
                        degBottom = Math.min( Math.max( deg, 0 ), 180 );
                        
						//degTop  = Math.min( Math.max( deg - 180, 0 ), 180 );
                    
                    $circleTop.css( {
                        transform: 'rotate(' + degBottom + 'deg)'
                    } );
                    /*
                    $circleBottom.css( {
                        transform: 'rotate(' + degTop +'deg)'
                    } );
                    */
                    $percentNumber.text( Math.floor( now ) );
                }
            } );
        } );        
    }
} );