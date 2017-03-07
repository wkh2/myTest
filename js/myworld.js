$(function(){
    // 我的世界栏目切换
    $('.sidebar .menu a').click(function(){
        var tar=$(this).data('target');
        $('.content').find(tar).removeClass('hide').siblings().addClass('hide');
        $(this).parent().addClass('active').siblings().removeClass('active');
    })
    // 右边栏目切换
    $('.collectbox .category a','.content').click(function(){
        var ind=$(this).index();
        $('.content .collectbox .tools .group').eq(ind).removeClass('hide').siblings().addClass('hide');
        $(this).addClass('active').siblings().removeClass('active');
    })
	
	 $('.groupbox .category a','.content').click(function(){
        var ind=$(this).index();
        $('.group1').eq(ind).removeClass('hide').siblings().addClass('hide');
        $(this).addClass('active').siblings().removeClass('active');
    })
    // 上边下来列表显示和隐藏
    $('body').on('mouseenter','.content .collectbox .tools>.group>ul>li>a',function(){
        $(this).siblings('ul').removeClass('hide');
    })
    .on('mouseleave','.content .collectbox .tools>.group>ul>li',function(){
        $(this).find('ul').addClass('hide');
    })
    // 下拉列表项的点击
    .on('click','.content .collectbox .tools>.group>ul>li>ul a',function(){
        $(this).parent().parent().addClass('hide').siblings('a').html($(this).text()+ ' <i class="fa fa-angle-down"></i>');
    })
})