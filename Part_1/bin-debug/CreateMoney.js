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
var CreateMoney = (function (_super) {
    __extends(CreateMoney, _super);
    function CreateMoney(objData) {
        var _this = _super.call(this) || this;
        _this.moneyData = objData;
        _this.init();
        return _this;
    }
    CreateMoney.prototype.init = function () {
        var money = createBitmapByName("money_png");
        this.addChild(money);
    };
    CreateMoney.prototype.update = function (timeStamp) {
        this.x -= GameData.speed;
    };
    return CreateMoney;
}(GameObject));
__reflect(CreateMoney.prototype, "CreateMoney");
//# sourceMappingURL=CreateMoney.js.map