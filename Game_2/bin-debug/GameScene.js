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
        _this.upBtn = createBitmapByName("move_up_png");
        _this.downBtn = createBitmapByName("move_down_png");
        _this.leftBtn = createBitmapByName("move_left_png");
        _this.rightBtn = createBitmapByName("move_right_png");
        _this.fireBtn = createBitmapByName("fire_bg_png");
        _this.jumpBtn = createBitmapByName("jump_bg_png");
        _this.buttleNum = createBitmapByName("buttle_bg_png");
        _this.moneyNum = createBitmapByName("money_bg_png");
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        var bg = createBitmapByName("Game_bg_png");
        bg.width = 1000;
        bg.height = 600;
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        //this.startTicker();
        this.createThings();
        this.createScene();
    };
    GameScene.prototype.createScene = function () {
        var tool_bg = createBitmapByName("tool_bg_png");
        tool_bg.width = 200;
        tool_bg.height = 1000;
        tool_bg.x = 1000;
        tool_bg.y = 0;
        this.addChild(tool_bg);
        var move = new egret.Sprite();
        move.graphics.beginFill(0x00f39800);
        move.graphics.drawRect(1000, 400, 200, 200);
        move.graphics.endFill();
        this.upBtn.x = 1073;
        this.upBtn.y = 407;
        this.downBtn.x = 1073;
        this.downBtn.y = 520;
        this.leftBtn.x = 1011;
        this.leftBtn.y = 466;
        this.rightBtn.x = 1119;
        this.rightBtn.y = 466;
        this.addChild(move);
        move.addChild(this.upBtn);
        move.addChild(this.downBtn);
        move.addChild(this.leftBtn);
        move.addChild(this.rightBtn);
        var operate = new egret.Sprite();
        operate.graphics.beginFill(0x00f39800);
        operate.graphics.drawRect(1000, 190, 200, 200);
        operate.graphics.endFill();
        this.fireBtn.x = 1017;
        this.fireBtn.y = 213;
        this.jumpBtn.x = 1017;
        this.jumpBtn.y = 300;
        this.addChild(operate);
        operate.addChild(this.fireBtn);
        operate.addChild(this.jumpBtn);
        var statistics = new egret.Sprite();
        statistics.graphics.beginFill(0x00f39800);
        statistics.graphics.drawRect(1000, 0, 200, 180);
        statistics.graphics.endFill();
        this.buttleNum.x = 1005;
        this.buttleNum.y = 19;
        this.moneyNum.x = 1005;
        this.moneyNum.y = 96;
        this.addChild(statistics);
        statistics.addChild(this.buttleNum);
        statistics.addChild(this.moneyNum);
        var buttle_tx = new egret.TextField();
        buttle_tx.text = "子弹数:";
        buttle_tx.textColor = 0xffffff;
        buttle_tx.size = 30;
        buttle_tx.x = 1014;
        buttle_tx.y = 35;
        statistics.addChild(buttle_tx);
        this.buttle_Number = new egret.TextField();
        this.buttle_Number.size = 30;
        this.buttle_Number.x = buttle_tx.width + 50;
        this.buttle_Number.y = 35;
        statistics.addChild(this.buttle_Number);
        this.changeButtleCount(0);
        var money_tx = new egret.TextField();
        money_tx.text = "金币数：";
        money_tx.textColor = 0xffffff;
        money_tx.size = 30;
        money_tx.x = 1014;
        money_tx.y = 108;
        statistics.addChild(money_tx);
        this.money_Number = new egret.TextField();
        this.money_Number.textColor = 0xffffff;
        this.money_Number.size = 60;
        this.money_Number.x = money_tx.width + 50;
        this.money_Number.y = 108;
        statistics.addChild(this.money_Number);
        this.changeMoneyCount(0);
    };
    GameScene.prototype.changeButtleCount = function (cnt) {
        this.buttle_Number.text = cnt.toString();
    };
    GameScene.prototype.changeMoneyCount = function (cnt) {
        this.money_Number.text = cnt.toString();
    };
    //创建物理场景
    GameScene.prototype.createWorld = function () {
        var wrd = new p2.World();
        wrd = new p2.World();
        wrd.gravity = [0, 1];
        this.pWorld = wrd;
    };
    GameScene.prototype.createPhysics = function (id, m, w, h, resid, x0, y0) {
        var pShape = new p2.Box({ width: w, height: h });
        var pBody = new p2.Body({ mass: m, fixedRotation: true });
        pBody.id = id;
        pBody.position[0] = x0 + w / 2;
        pBody.position[1] = y0 + h / 2;
        pBody.addShape(pShape);
        this.pWorld.addBody(pBody);
        this.bindAsset(pBody, pShape, resid);
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
        this.pWorld.step(2.5);
        this.pWorld.bodies.forEach(function (b) {
            if (b.displays != null) {
                b.displays[0].x = b.position[0];
                b.displays[0].y = b.position[1];
            }
            //this.ground.position[0]+=GameData.distance;
        });
        this.creatPT();
    };
    /*
        public startTicker(){
            egret.ticker.$startTick(this.update,this);
        }
        public stopTicker(){
            egret.ticker.$stopTick(this.update,this);
        }
        private update(timeStap:number):boolean{
            
            return true;
        }
    */
    GameScene.prototype.creatPT = function () {
        var element = GameData.elements[0];
        if (element && GameData.distance >= element.distance + GameData.rounds * GameData.maxMileage) {
            if (element.type == "ground") {
                console.log("创建ground");
                var groundShape = new p2.Box({ width: 1000, height: 150 });
                this.ground = new p2.Body({ mass: 0 });
                this.ground.position[0] = element.x;
                this.ground.position[1] = element.y;
                this.ground.id = 1;
                this.ground.addShape(groundShape);
                this.pWorld.addBody(this.ground);
                this.bindAsset(this.ground, groundShape, "ground_png");
            }
            if (GameData.elements.length <= 0) {
                //注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
                GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
                console.log(RES.getRes("config_json"));
                GameData.rounds++;
            }
        }
        /* var materialA=new p2.Material(0);
         var materialB=new p2.Material(1);
         this.thePlayer.shapes[0].material=materialA;
         this.ground.shapes[0].material=materialB;
         var contactMaterialAB:p2.ContactMaterial=new p2.ContactMaterial(materialA,materialB);
         contactMaterialAB.friction=0;
         this.pWorld.addContactMaterial(contactMaterialAB);*/
    };
    GameScene.prototype.createGround_1 = function () {
        var groundShape = new p2.Box({ width: 1000, height: 150 });
        this.ground = new p2.Body({ mass: 0 });
        this.ground.position[0] = 500;
        this.ground.position[1] = 525;
        this.ground.id = 1;
        this.ground.addShape(groundShape);
        this.pWorld.addBody(this.ground);
        this.bindAsset(this.ground, groundShape, "ground_png");
    };
    //创建玩家
    GameScene.prototype.createPlayer = function () {
        var playerShape = new p2.Box({ width: 40, height: 100 });
        this.thePlayer = new p2.Body({ mass: 1, position: [300, 425] });
        this.thePlayer.id = 0;
        this.thePlayer.addShape(playerShape);
        this.pWorld.addBody(this.thePlayer);
        this.bindAsset(this.thePlayer, playerShape, "player_png");
    };
    GameScene.prototype.createThings = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.run, this);
        this.createWorld();
        this.createPhysics(1, 0, 0, 0, "stone_png", 0, 0); //?
        this.createPlayer();
        this.createGround_1();
    };
    //点击移动按钮
    GameScene.prototype.onClickView = function () {
        /*
            this.upBtn.touchEnabled=true;
            this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                console.log("向上移动");
                this.thePlayer.force=[0,-1];
            },this)
            this.downBtn.touchEnabled=true;
            this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                console.log("向下移动");
                this.thePlayer.force=[0,1];
            },this)
        */
        this.leftBtn.touchEnabled = true;
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向左移动");
            GameData.distance -= 10;
        }, this);
        this.rightBtn.touchEnabled = true;
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("向右移动");
            GameData.distance += 10;
        }, this);
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map