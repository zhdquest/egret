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
var CreateEnemy = (function (_super) {
    __extends(CreateEnemy, _super);
    function CreateEnemy(objData) {
        var _this = _super.call(this) || this;
        _this.enemyData = objData;
        _this.init();
        return _this;
    }
    CreateEnemy.prototype.init = function () {
        var enemy = createBitmapByName("enemy_png");
        this.addChild(enemy);
    };
    CreateEnemy.prototype.update = function (timeStamp) {
        this.x -= GameData.speed;
    };
    return CreateEnemy;
}(GameObject));
__reflect(CreateEnemy.prototype, "CreateEnemy");
//# sourceMappingURL=CreateEnemy.js.map