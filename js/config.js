(function(){

//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
}

//分享

$('#js-btn-share').bind('tap',function(){
	$('#js-share').show();
})
$('#js-share').bind('tap',function(){
	$(this).hide();
});


var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeLeft(function(){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
	}else{
		pageIndex=1;
	};
	pageMove(towards.left);
})

$(document).swipeRight(function(){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1; 
	}else{
		pageIndex=pageTotal;
	};
	pageMove(towards.right);	
})

function pageMove(tw){
	var lastPage;
	if(tw=='4'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
		
	}else if(tw=='2'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
		
	}

	var nowPage = ".page-"+pageIndex;
	
	switch(tw) {
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}


    setInterval(function () {
        if (isAnimating) return;
        if (pageIndex < pageTotal) {
            pageIndex+=1;
        }else{
            pageIndex=1;
        };
        pageMove(towards.left);
    }, 4000)


})();