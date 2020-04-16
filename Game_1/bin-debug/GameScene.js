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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.upBtn = createBitmapByName("up_png");
        _this.downBtn = createBitmapByName("down_png");
        _this.leftBtn = createBitmapByName("left_png");
        _this.rightBtn = createBitmapByName("right_png");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        var bg = createBitmapByName("field_1_jpg");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        var move = new egret.Sprite();
        move.graphics.beginFill(999595, 0.5);
        move.graphics.drawRect(800, 400, 200, 200);
        move.graphics.endFill();
        this.upBtn.x = 865;
        this.upBtn.y = 400;
        this.downBtn.x = 865;
        this.downBtn.y = 520;
        this.leftBtn.x = 800;
        this.leftBtn.y = 460;
        this.rightBtn.x = 920;
        this.rightBtn.y = 465;
        this.addChild(move);
        move.addChild(this.upBtn);
        move.addChild(this.downBtn);
        move.addChild(this.leftBtn);
        move.addChild(this.rightBtn);
    };
    GameScene.prototype.onClickView = function () {
        this.upBtn.touchEnabled = true;
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向上移动");
        }, this);
        this.downBtn.touchEnabled = true;
        this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向下移动");
        }, this);
        this.leftBtn.touchEnabled = true;
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向左移动");
        }, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向右移动");
        }, this);
    };
    GameScene.prototype.startGame = function () {
    };
    GameScene.prototype.startTicker = function () {
        egret.ticker.$startTick(this.update, this);
    };
    GameScene.prototype.stopTicker = function () {
        egret.ticker.$stopTick(this.update, this);
    };
    GameScene.prototype.update = function (timeStap) {
        if (!GameData.hasStart) {
            return true;
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map