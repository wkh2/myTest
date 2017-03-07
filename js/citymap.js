function winResize() {
    if($('#cityMap').length&&$('#cityMap').css('display')!='none'){
        var $container=$('#mainContainer>.container');
        var $navbar=$container.find('.navbar');
        var $modal=$container.find('#cityMapModal');
        var $child=$modal.children(); 
        var $detailModal=$('#detailModal');
        $navbar.css({left:($container.width()-$navbar.width())/2});
        if($modal.css('display')!='none'){
            if($child.hasClass('hotBox')||$child.hasClass('zoneBox')){
                $child.css({
                    left:($container.width()-$child.width())/2,
                    top:($container.height()-$child[0].offsetHeight-$navbar.height())/2
                });
            }else if($child.hasClass('planBox')||$child.hasClass('raidersBox')){
                $child.css({
                    top:($container.height()-$child[0].offsetHeight-$navbar.height())/2
                });
                if(!$detailModal.hasClass('hide')){
                    $detailModal.css({
                        top:($container.height()-$detailModal[0].offsetHeight-$navbar.height())/2
                    });
                }
            }
        }
    }
}
function  draw(url,cvs,ctx) {
    var image=new Image();
    image.onload=function () {
        ctx.drawImage(this,0,0,this.width,this.height,0,0, cvs.width,cvs.height);
    }
    image.src=url;
}
var scBanner={
    init:function(){
        this.num=0;
        this.bool=false;
        this.interval=3000;
        this.root=$('.sc-banner .frame');
        this.box=this.root.find('.box');
        this.box1=this.root.find('.box-1');
        this.box2=$('<div class=box-2>').html(this.box1.html()).appendTo(this.box);
        this.prev=this.root.siblings('.controls').find('.prev');
        this.next=this.prev.siblings('.next');
        this.links=this.box1.find('a');
        this.power=!(this.links.length%3)?3:!(this.links.length%4)?4:2;
        this.time=200*this.power;
        this.step=(this.links.width()+parseFloat(this.links.css('margin-right')))*this.power;
        this.count=Math.ceil(this.box1.width()/this.step);
    },
    toLeft:function(){
        var that=this;
        return function(){
            that.num++;
            that.bool=true;
            if(that.num>that.count){
                that.num=1;
                that.box.css({left:0});
            }
            that.box.stop().animate({left:'-'+that.step*that.num+'px'},that.time);
        }
    },
    toRight:function(){
        var that=this;
        return function(){
            that.bool=false;
            if(that.num<=0){
                that.num=that.count;
                that.box.css({left:'-'+that.step*that.num+'px'});
            }
            that.num--;
            that.box.stop().animate({left:'-'+that.step*that.num+'px'},that.time);
        }
    },
    timer:function(){
        this.td=this.bool?setInterval(this.toLeft(),
        this.interval):setInterval(this.toRight(),this.interval);                  
    },
    start:function(){
        var that=this;
        this.init();
        //this.timer();
        this.prev.click(this.toLeft())
        this.next.click(this.toRight())
        this.root.parent().mouseover(function(){
            //clearInterval(that.td);
        })
        //.mouseout(function(){that.timer()})  
        this.box.find('a').click(function(){
            that.box.find('a').removeClass('active');
            $(this).addClass('active');
            $('#zoneBox .detailsBox .box>img').attr({
                src:$(this).find('img').attr('src')
            });
        })  
     },
     end:function(){
         var that=this;
         return function(){
            that.prev.unbind('click');
            that.next.unbind('click');
            that.box.find('a').unbind('click');
         }
     }
}


$(function(){
    $(window).resize(winResize).resize();
    $('#cityMapModal .sc-banner').length&&scBanner.start();
    // 打开热点
    $('body').on('click','#cityMap .hotspot',function () {
        var $modal=$('#cityMapModal');
        var html=$('#hotBoxTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('.hotBox').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
    // 打开组团
    $('body').on('click','#cityMap .zone',function () {
        var $modal=$('#cityMapModal');
        var html=$('#zoneMainTemplate').html();
        var subHtml=$('#zoneSubOneTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).find('.detailsBox').html(subHtml).end().removeClass('hide');
            scBanner.start();
        }else{
            if(!$modal.find('.zoneBox').length){
                $modal.html(html).find('.detailsBox').html(subHtml);
                scBanner.start();
            }else{
                $modal.empty().addClass('hide');
                scBanner.end()();
            }
        }
        winResize();
    })
	
	
	
	
	
	
    // 打开规划
    .on('click','#cityMap .plan',function () {
        var $modal=$('#cityMapModal');
        var html=$('#planBoxTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('.planBox').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
    // 打开攻略
    .on('click','#cityMap #serch',function () {
        var $modal=$('#detailModal');
        var html=$('#myplanDetailTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('#detailModal').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
	
	// 打开我也要组团
    .on('click','#cityMap #zoneBox .travel a',function () {
        var $modal=$('#cityMapModal');
        var html=$('#tuanDetailTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('.cityMapModal').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
	
	//打开搜索长页面
	.on('click','#cityMap .raiders',function () {
        var $modal=$('#cityMapModal');
        var html=$('#raidersBoxTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('#print-con').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
	
	//打开打印页面
	
	.on('click','#cityMap .planHead .print',function () {
        var $modal=$('#cityMapModal');
        var html=$('#printDetailTemplate').html();
        if($modal.hasClass('hide')){
            $modal.html(html).removeClass('hide');
        }else{
            if(!$modal.find('.raidersBox').length){
                $modal.html(html);
            }else{
                $modal.empty().addClass('hide');
            }
        }
        winResize();
    })
	
	
	
	
    // 显示和隐藏日程列表
    .on('click','#planBox .planList .title',function () {
        var $sib=$(this).siblings('div');
        $sib.toggle();
        if($sib.css('display')!='none'){
            $(this).find('.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
        }else{
            $(this).find('.fa').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    })
    // 关闭小窗口
    .on('click','#detailModal .close',function () {
        $(this).parent().empty().addClass('hide');
        $('#cityMap .navbar .shade').addClass('hide');
    })
	
	 // 关闭打印窗口
    .on('click','#print-con .close',function () {
        $(this).parent().empty().addClass('hide');
        $('#cityMap #print-con').addClass('hide');
    })
	
	
	
	
	
    // 日程链接点击打开详情窗口
    .on('click','#planBox .planList li div a',function () {
        var html=$('#myplanDetailTemplate').html();
        $('#detailModal').html(html).removeClass('hide');
        $("#detailModal .modal-info").mCustomScrollbar({
            scrollInertia:200
        });
        winResize();
        $('#cityMap .navbar .shade').removeClass('hide');
    })
    // 攻略列表项点击打开详情窗口
    .on('click','#raidersBox .resultList li',function () {
        var html=$('#raidersDetailTemplate').html();
        $('#detailModal').html(html).removeClass('hide');
        $("#detailModal .modal-info").mCustomScrollbar({
            scrollInertia:200
        });
        winResize();
        $('#cityMap .navbar .shade').removeClass('hide');
    })
    // 模拟文件框的单击
    .on('click','#detailModal .fileField a',function () {
        $(this).siblings('[type=file]').click();
    })
    // 吃，住，玩单击
    .on('click','.category-btns a',function(){
        $(this).addClass('active').siblings().removeClass('active');
    })
    // 结果列表项单击
    .on('click','#raidersBox .resultList li',function(){
        
    })
    .on('click','.navbar .navgroup a',function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
    var scene3D=document.getElementById('scene3D');
    var cvs=document.createElement('canvas');
    var ctx=cvs.getContext('2d');
    var url='img/gugong.jpeg';
    scene3D.appendChild(cvs);
    cvs.width=scene3D.offsetWidth;
    cvs.height=scene3D.offsetHeight;
    draw(url,cvs,ctx) 
    
    $('#cityMap .zone').click()
})


   $('raidersBox a','.cityMapModal').click(function(){
        var ind=$(this).index();
        $('head-tools').eq(ind).removeClass('hide').siblings().addClass('hide');
        $(this).addClass('active').siblings().removeClass('active');
    }) 
	
	  $('cityMapModal a','.content').click(function(){
        var ind=$(this).index();
        $('chizhubox').eq(ind).removeClass('hide').siblings().addClass('hide');
        $(this).addClass('active').siblings().removeClass('active');
    })