var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var OverScene = (function (_super) {
    __extends(OverScene, _super);
    function OverScene() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    OverScene.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    OverScene.prototype.initView = function () {
        var bg = createBitmapByName("bg_640_png");
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        var re_start = new egret.TextField();
        re_start.text = "成功达到终点";
        re_start.textColor = 0x000000;
        re_start.size = 60;
        re_start.x = 150;
        re_start.y = 280;
        this.addChild(re_start);
        //开始游戏的按钮
        var startBtn = createBitmapByName("re_start_png");
        this.addChild(startBtn);
        startBtn.x = (this.stage.stageWidth - startBtn.width) / 2;
        startBtn.y = (this.stage.stageHeight - startBtn.height) / 2;
        startBtn.touchEnabled = true;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("开始游戏");
            SceneController.startGameScene();
        }, this);
    };
    return OverScene;
}(egret.DisplayObjectContainer));
__reflect(OverScene.prototype, "OverScene");
//# sourceMappingURL=OverScene.js.map