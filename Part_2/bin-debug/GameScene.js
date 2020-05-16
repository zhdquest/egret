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
        _this.time = 500;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClickView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        var bg = createBitmapByName("bg_640_png");
        bg.width = 640;
        bg.height = 1136;
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);
        this.createThings();
        var time_tx = new egret.TextField();
        time_tx.text = "剩余时间:";
        time_tx.textColor = 0xffffff;
        time_tx.size = 30;
        time_tx.x = 30;
        time_tx.y = 1110;
        this.addChild(time_tx);
        this.timeNum = new egret.TextField();
        this.timeNum.size = 30;
        this.timeNum.x = time_tx.width + 50;
        this.timeNum.y = time_tx.y;
        this.addChild(this.timeNum);
        this.changeTimeCount(500);
    };
    GameScene.prototype.changeTimeCount = function (cnt) {
        this.timeNum.text = cnt.toString();
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
        });
        this.checkMoveThings();
        this.checkEnd(this.pWorld, this.thePlayer);
        this.changeTimeCount(this.time);
        if (this.time > 0) {
            this.time--;
        }
        else {
            this.createPhysics(4, 0, 100, 100, "ss_png", 150, 800);
        }
    };
    GameScene.prototype.checkMoveThings = function () {
        this.moveThings[0].position[0] += 3;
        this.moveThings[1].position[0] -= 3;
        this.moveThings[2].position[0] += 3;
        this.moveThings[3].position[0] -= 3;
        this.moveThings[4].position[0] += 3;
        if (this.moveThings[0].position[0] > 900) {
            this.moveThings[0].position[0] = 0;
        }
        if (this.moveThings[1].position[0] < -200) {
            this.moveThings[1].position[0] = 640;
        }
        if (this.moveThings[2].position[0] > 900) {
            this.moveThings[2].position[0] = 0;
        }
        if (this.moveThings[3].position[0] < -200) {
            this.moveThings[3].position[0] = 640;
        }
        if (this.moveThings[4].position[0] > 900) {
            this.moveThings[4].position[0] = 0;
        }
    };
    //创建玩家
    GameScene.prototype.createPlayer = function () {
        var playerShape = new p2.Box({ width: 40, height: 50 });
        this.thePlayer = new p2.Body({ mass: 1, position: [600, 980] });
        this.thePlayer.id = 0;
        this.thePlayer.addShape(playerShape);
        this.pWorld.addBody(this.thePlayer);
        this.bindAsset(this.thePlayer, playerShape, "player_png");
    };
    GameScene.prototype.createThings = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.run, this);
        this.createWorld();
        this.createPhysics(1, 0, 0, 0, "ground_640_png", 0, 0); //?
        this.createPlayer();
        this.fixedThings = [
            this.createPhysics(1, 0, 640, 150, "ground_640_png", 0, 1000),
            this.createPhysics(1, 0, 1, 1136, "bg_640_png", 0, 0),
            this.createPhysics(1, 0, 1, 1136, "bg_640_png", 639, 0),
        ];
        this.moveThings = [
            this.createPhysics(2, 0, 200, 10, "plane1_png", 50, 900),
            this.createPhysics(2, 0, 200, 10, "plane1_png", 600, 750),
            this.createPhysics(2, 0, 200, 10, "plane1_png", 300, 600),
            this.createPhysics(2, 0, 200, 10, "plane1_png", 150, 450),
            this.createPhysics(2, 0, 200, 10, "plane1_png", 350, 300),
        ];
        this.createPhysics(4, 0, 300, 70, "end_png", 170, 30);
        var materialA = new p2.Material(0);
        var materialB = new p2.Material(1);
        this.thePlayer.shapes[0].material = materialA;
        this.fixedThings[0].shapes[0].material = materialB;
        var contactMaterialAB = new p2.ContactMaterial(materialA, materialB);
        contactMaterialAB.friction = 0;
        contactMaterialAB.restitution = 1;
        this.pWorld.addContactMaterial(contactMaterialAB);
    };
    //点击移动按钮
    GameScene.prototype.onClickView = function (e) {
        if (this.checkIfCanJump(this.pWorld, this.thePlayer) == true) {
            if (e.stageX < this.thePlayer.position[0] - 50) {
                this.thePlayer.force = [-5, -15];
                console.log("向左跳");
            }
            else if (e.stageX > this.thePlayer.position[0] + 50) {
                this.thePlayer.force = [5, -15];
                console.log("向右跳");
            }
            else {
                this.thePlayer.force = [0, -15];
                console.log("向上跳");
            }
        }
    };
    GameScene.prototype.checkIfCanJump = function (world, body) {
        var yAxis = [0, 1];
        var result = false;
        //console.log(world.broadphase.getCollisionPairs[0]);
        for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
            var c = world.narrowphase.contactEquations[i];
            if (c.bodyA === body || c.bodyB === body) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === body)
                    d *= -1;
                egret.log("d value:" + d);
                if (d < -0.5)
                    result = true;
            }
        }
        return result;
    };
    GameScene.prototype.checkEnd = function (world, body) {
        var result = false;
        for (var i = 0; i < world.narrowphase.contactEquations.length; i++) {
            var c = world.narrowphase.contactEquations[i];
            if (c.bodyA === body || c.bodyB === body) {
                if (c.bodyA.id == 4 || c.bodyB.id == 4) {
                    SceneController.GameEnd();
                }
            }
        }
        return result;
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map