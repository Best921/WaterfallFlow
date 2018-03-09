//模拟数据
var data = [{
    "src": "1.png",
    "title": "第一怪 竹筒当烟袋"
}, {
    "src": "2.png",
    "title": "第二怪 草帽当锅盖"
}, {
    "src": "3.png",
    "title": "第三怪 这边下雨那边晒"
}, {
    "src": "4.png",
    "title": "第四怪 四季服装同穿戴"
}, {
    "src": "5.png",
    "title": "第五怪 火车没有汽车快"
}, {
    "src": "6.png",
    "title": "第六怪 火车不通国内通国外"
}, {
    "src": "7.png",
    "title": "第七怪 老奶爬山比猴快"
}, {
    "src": "8.png",
    "title": "第八怪 鞋子后面多一块"
}, {
    "src": "9.png",
    "title": "第九怪 脚趾四季露在外"
}, {
    "src": "10.png",
    "title": "第十怪 鸡蛋拴着卖"
}, {
    "src": "11.png",
    "title": "第十一怪 粑粑叫饵块"
}, {
    "src": "12.png",
    "title": "第十二怪 花生蚕豆数着卖"
}, {
    "src": "13.png",
    "title": "第十三怪 三个蚊子一盘菜"
}, {
    "src": "14.png",
    "title": "第十四怪 四个老鼠一麻袋"
}, {
    "src": "15.png",
    "title": "第十五怪 树上松毛扭着卖"
}, {
    "src": "16.png",
    "title": "第十六怪 姑娘叫老太"
}, {
    "src": "17.png",
    "title": "第十七怪 小和尚可以谈恋爱"
}, {
    "src": "18.png",
    "title": "第十八怪 背着娃娃谈恋爱"
}];

$(function(){
	var wrap = $('.wrap');
	var boxes = $('.wrap').children('div');
	setWaterfall(wrap,boxes);
	$(document).scroll(function(){
		appendBox(wrap);
	});
});

//追加盒子
function appendBox(wrap){
	if(getCheck(wrap)){
		for(index in data){
			var innerHtml = '<div><img src="images/' + data[index].src + '"><a href="#">' + data[index].title + '</a></div>';
			wrap.append(innerHtml);
		}
		setWaterfall(wrap,wrap.children('div'));
	}
	
}

//设置追加条件
//文档高度+滚动的大小 >= 最后一个盒子所在列的高度
function getCheck(wrap){
	var documentHeight = $(window).height();
	var scrollHeight = $(window).scrollTop();
	var box = wrap.children('div').last();
	//offset().top值，是整个盒子的最外层（包含内边距）距离文档的上方的偏移量
	var maxHeight = box.offset().top + box.height() + 20;
	return documentHeight + scrollHeight >= maxHeight ? true : false;
}

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
			var box = boxes.eq(i);
			setAddBoxStyle(box,left,top,i);
			everyHeight[minIndex] += box.height() + 40;//content + padding + margin
		}
		boxes.eq(i).hover(function(){
			$(this).stop().animate({
				'opacity' : '0.5'
			},500);
		},function(){
			$(this).stop().animate({
				'opacity' : '1'
			},500);
		});
	}
}

//设置新增盒子的样式
var startIndex = 0;
function setAddBoxStyle(box,left,top,index){
	if(index <= startIndex){
		return false;//不给已存在的盒子设置动画
	}
	box.css({
		'position' : 'absolute',
		'left' : left,
		'top' : top,
		'opacity' : '0'
	}).stop().animate({
		'opacity' : '1'
	},1000);
	startIndex = index;
}

//获取最小列索引
function getMinIndex(minHeight,everyHeight){
	for (index in everyHeight) {
		if(everyHeight[index] === minHeight){
			return index;
		}
	}
}