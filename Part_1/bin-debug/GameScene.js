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
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        this.bgContainer = new egret.DisplayObjectContainer();
        this.rolerContainer = new egret.DisplayObjectContainer();
        this.addChild(this.bgContainer);
        this.addChild(this.rolerContainer);
        var bg = createBitmapByName("bg_640_png");
        bg.width = 640;
        bg.height = 1136;
        bg.x = 0;
        bg.y = 0;
        GameData.hasStart = true;
        this.bgContainer.addChild(bg);
        this.gameObjectList = [];
        this.deleteObjectList = [];
        this.createScene();
        this.createGround();
        this.startTicker();
    };
    GameScene.prototype.createScene = function () {
        var spr = new egret.Sprite();
        spr.graphics.beginFill(0xa84200);
        spr.graphics.drawRect(20, 20, 300, 100);
        spr.graphics.endFill();
        this.bgContainer.addChild(spr);
        var dis_num = new egret.TextField();
        dis_num.text = "distance";
        dis_num.textColor = 0xffffff;
        dis_num.size = 40;
        dis_num.x = 43;
        dis_num.y = 52;
        spr.addChild(dis_num);
        this.distance = new egret.TextField();
        this.distance.textColor = 0xffffff;
        this.distance.size = 40;
        this.distance.x = dis_num.x + dis_num.width + 20;
        this.distance.y = dis_num.y;
        spr.addChild(this.distance);
        this.changeDistanceCount(0);
    };
    GameScene.prototype.changeDistanceCount = function (cnt) {
        this.distance.text = cnt.toString();
    };
    GameScene.prototype.createGround = function () {
        var ground1 = createBitmapByName("ground_640_png");
        ground1.y = this.stage.stageHeight - ground1.height;
        this.bgContainer.addChild(ground1);
        this.ground1 = ground1;
        var ground2 = createBitmapByName("ground_640_png");
        ground2.y = this.stage.stageHeight - ground2.height;
        ground2.x = ground1.width;
        console.log(ground2.x);
        this.bgContainer.addChild(ground2);
        this.ground2 = ground2;
    };
    GameScene.prototype.startTicker = function () {
        egret.ticker.$startTick(this.update, this);
    };
    GameScene.prototype.stopTicker = function () {
        egret.ticker.$stopTick(this.update, this);
    };
    GameScene.prototype.update = function (timeStap) {
        /*if(!GameData.hasStart){
            return true;
        }*/
        if (GameData.distance <= 3000) {
            if (this.ground1.x + this.ground1.width <= 0) {
                this.ground1.x = this.ground2.x + this.ground2.width;
            }
            if (this.ground2.x + this.ground2.width <= 0) {
                this.ground2.x = this.ground1.x + this.ground1.width;
            }
            this.ground1.x -= GameData.speed;
            this.ground2.x -= GameData.speed;
            GameData.distance += GameData.speed / 2;
            this.changeDistanceCount(GameData.distance);
            for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
                var obj = _a[_i];
                obj.update(timeStap);
            }
            this.check();
            this.addElement();
        }
        else {
            GameData.hasStart = false;
            SceneController.GameEnd;
        }
        return true;
    };
    GameScene.prototype.addElement = function () {
        var element = GameData.elements[0];
        //获取到element 并且 里程数大于elements的里程数的时候 就创建障碍物
        if (element && GameData.distance >= element.distance) {
            if (element.type == "money") {
                console.log("创建money");
                var money = new CreateMoney(element);
                money.x = this.stage.stageWidth;
                money.y = element.y;
                this.rolerContainer.addChild(money);
                console.log(555555);
                this.gameObjectList.push(money);
            }
            if (element.type == "enemy") {
                console.log("创建enemy");
                var enemy = new CreateEnemy(element);
                enemy.x = this.stage.stageWidth;
                enemy.y = element.y;
                this.rolerContainer.addChild(enemy);
                console.log(555555);
                this.gameObjectList.push(enemy);
            }
            GameData.elements.splice(0, 1);
            if (GameData.elements.length <= 0) {
                //注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
                GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
                console.log(RES.getRes("config_json"));
                GameData.rounds++;
            }
        }
    };
    GameScene.prototype.check = function () {
        for (var _i = 0, _a = this.gameObjectList; _i < _a.length; _i++) {
            var things = _a[_i];
            if (things.x + things.width + 50 < 0) {
                this.deleteObjectList.push(things);
            }
            for (var _b = 0, _c = this.deleteObjectList; _b < _c.length; _b++) {
                var obj = _c[_b];
                this.rolerContainer.removeChild(obj);
                this.gameObjectList.splice(this.gameObjectList.indexOf(obj), 1);
            }
            this.deleteObjectList.length = 0;
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map