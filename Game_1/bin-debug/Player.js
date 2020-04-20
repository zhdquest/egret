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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.thePlayer = createBitmapByName("dog_1_png");
        _this.init();
        return _this;
    }
    Player.prototype.init = function () {
        this.addChild(this.thePlayer);
    };
    Player.prototype.moveUp = function () {
        this.thePlayer.y -= 10;
    };
    Player.prototype.moveDown = function () {
        this.thePlayer.y += 10;
    };
    Player.prototype.moveLeft = function () {
        this.thePlayer.x -= 10;
    };
    Player.prototype.moveRight = function () {
        this.thePlayer.x += 10;
    };
    return Player;
}(egret.DisplayObjectContainer));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map