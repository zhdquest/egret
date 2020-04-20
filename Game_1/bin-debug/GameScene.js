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
        _this.factor = 30; //1米~30像素
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
        this.createSence(); //创建游戏场景
        //创建物理场景
        this.createPhysics(1, 50, 50, "gress_1_png", 10, 10);
        this.createPlayer(); //创建玩家
    };
    //创建游戏场景
    GameScene.prototype.createSence = function () {
        //创建游戏背景
        var bg = createBitmapByName("field_1_jpg");
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
        this.addChild(bg);
        //创建移动操作盘
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
    //创建物理场景
    GameScene.prototype.createPhysics = function (id, w, h, resid, x0, y0) {
        var pWorld = new p2.World();
        pWorld.gravity = [0, 0]; //失重状态
        this.world = pWorld;
        var pShape = new p2.Box({ width: w, height: h });
        var pBody = new p2.Body();
        pBody.id = id;
        pBody.position[0] = x0 + w / 2;
        pBody.position[1] = y0 + h / 2;
        pBody.addShape(pShape);
        this.world.addBody(pBody);
        this.bindAsset(pBody, pShape, resid);
        this.addEventListener(egret.Event.ENTER_FRAME, this.run, this);
        return pBody;
    };
    GameScene.prototype.getBitmap = function (resName) {
        var pBitmap = new egret.Bitmap();
        pBitmap.texture = RES.getRes(resName);
        pBitmap.anchorOffsetX = pBitmap.width / 2;
        pBitmap.anchorOffsetY = pBitmap.height / 2;
        return pBitmap;
    };
    GameScene.prototype.bindAsset = function (body, shape, asset) {
        var img = this.getBitmap(asset);
        img.scaleX = shape.width / img.width;
        img.scaleY = shape.height / img.height;
        this.addChild(img);
        img.x = body.position[0];
        img.y = body.position[1];
        body.displays = [img];
    };
    GameScene.prototype.run = function () {
        this.world.step(2.5);
        this.world.bodies.forEach(function (b) {
            if (b.displays != null) {
                b.displays[0].x = b.position[0];
                b.displays[0].y = b.position[1];
            }
        });
    };
    //创建玩家
    GameScene.prototype.createPlayer = function () {
        var playerShape = new p2.Box({ width: 10, height: 10 });
        this.thePlayer = new p2.Body({ position: [100, 100] });
        this.thePlayer.addShape(playerShape);
        this.world.addBody(this.thePlayer);
        this.bindAsset(this.thePlayer, playerShape, "flower_1_png");
    };
    //点击移动按钮
    GameScene.prototype.onClickView = function () {
        var _this = this;
        this.upBtn.touchEnabled = true;
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向上移动");
            _this.thePlayer.position[1] -= 10;
        }, this);
        this.downBtn.touchEnabled = true;
        this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向下移动");
            _this.thePlayer.position[1] += 10;
        }, this);
        this.leftBtn.touchEnabled = true;
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向左移动");
            _this.thePlayer.position[0] -= 10;
        }, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向右移动");
            _this.thePlayer.position[0] += 10;
        }, this);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map