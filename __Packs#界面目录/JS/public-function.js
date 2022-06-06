/*=================>(启动器功能) 界面发送功能数据到启动器处理*/
function StarLauncher_CommandFunction() {
    var a = Array.prototype.slice.call(arguments);
	/*数据识别符号,勿动这个符号*/
    console.log(a.join('⊕⊥⊕'));
}

/*=================>(启动器功能) 刷新程序当前页面渲染数据.避免某系数据缓存继承导致异常*/
function StarLauncher_WebReloadPage(s) {
    StarLauncher_CommandFunction('StarLauncher_Webreloadpage', (s == "" || s == undefined) ? "2" : s);
}

/*=================>(启动器功能) 保存当前显示页面实时截图*/
function StarLauncher_ScreenshotSave(name) {
    StarLauncher_CommandFunction('StarLauncher_ScreenshotSave', name);
}

/*=================>(网页功能) 界面完全屏蔽右键功能*/
function Prevent_Right_click() {
    return false;
}
document.oncontextmenu = Prevent_Right_click;
document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
    }
    if (window.event && window.event.keyCode == 13) {
        window.event.keyCode = 505;
    }
};

/*=================>(网页功能) 打开等待底栏状态显示,不提供内容则为关闭显示*/
function Prevent_OpenWaitFloatingWindow_Load(信息内容) {
    $('.floating-window').remove();
    if (信息内容) {
        $('body').children(":last-child").after('<div class="floating-window"><div class="background-div"></div><p class="bottom-text">' + 信息内容 + '</p><div id="preload"><span></span><span></span><span></span><span></span><span></span><span></span></div></div>');
    } else {
        $('.floating-window').remove();
    }
    return false;
}

/*=================>(网页功能) 打开全覆盖弹窗提示,不提供内容则为关闭显示*/
function Prevent_OpenTipsFloatingWindow(标题, 信息内容) {
    $('.floating-window').remove();
    if (标题 || 信息内容) {
        if (标题 == null) {
            标题 = 'Null';
        }
        if (信息内容 == null) {
            信息内容 = 'Null';
        }
        $('body').children(":last-child").after('<div class="floating-window"><div class="background-div"></div><div class="center-msg-div"><h2>' + 标题 + '</h2><p>' + 信息内容 + '</p><input type="button" onclick="Prevent_OpenTipsFloatingWindow()" value="确认"></div></div>');
    } else {
        $('.floating-window').remove();
    }
    return false;
}

/*=================>(网页功能) 获取url中的参数*/
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            return pair[1];
        }
    }
    return null;
}

/*=================>(网页功能) 获取当前页面Url*/
function getUrl() {
    return window.location.host + window.location.pathname;
}

/*=================>(网页功能) 格式化空文本读取返回.避免无内容.并自动解码*/
function getTextformat(text) {
    return (text == "" || text == undefined || false) ? "null" : decodeURI(text);
}

