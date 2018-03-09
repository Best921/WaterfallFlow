$(function(){
	var wrap = $('.wrap');
	var boxes = $('.wrap').children('div');
	setWaterfall(wrap,boxes);
});

//设置瀑布流布局
function setWaterfall(wrap,boxes){
	//获取屏幕可以容纳的列数
	var windowWidth = $(window).width();
	var boxWidth = boxes.eq(0).width() + 40;//content + padding + margin
	var colsNumber = Math.floor(windowWidth / boxWidth);

	//设置容器的宽度
	wrap.width(colsNumber * boxWidth);

	//定义一个数组存储每一列的宽度
	var everyHeight = new Array();
	for (var i = 0; i < boxes.length; i++) {
		if(i < colsNumber){
			everyHeight[i] = boxes.eq(i).height() + 40;//content + padding + margin
		}else{
			//将该box放置在最小列
			var minHeight = Math.min.apply(null,everyHeight);
			var minIndex = getMinIndex(minHeight,everyHeight);
			var top = minHeight;
			var left = boxes.eq(minIndex).position().left;
			boxes.eq(i).css({
				'position' : 'absolute',
				'left' : left,
				'top' : top,
				'opacity' : '0'
			}).stop().animate({
				'opacity' : '1'
			},1000);
			everyHeight[minIndex] += boxes.eq(i).height() + 40;//content + padding + margin
		}
	}
}

//获取最小列索引
function getMinIndex(minHeight,everyHeight){
	for (index in everyHeight) {
		if(everyHeight[index] === minHeight){
			return index;
		}
	}
}