var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneController = (function () {
    function SceneController() {
        this.startScene = new StartScene();
        this.gameScene = new GameScene();
        this.overScene = new OverScene();
    }
    Object.defineProperty(SceneController, "instance", {
        get: function () {
            if (!this.sceneController) {
                this.sceneController = new SceneController();
            }
            return this.sceneController;
        },
        enumerable: true,
        configurable: true
    });
    SceneController.prototype.setStage = function (s) {
        this.stageMain = s;
    };
    /**
     * 游戏初始化（进入开始游戏场景）
     */
    SceneController.initGame = function () {
        var stage = this.instance.stageMain;
        if (this.instance.gameScene.parent) {
            stage.removeChild(this.instance.gameScene);
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.overScene.parent) {
            stage.removeChild(this.instance.overScene);
            this.instance.overScene = new OverScene();
        }
        //加入开始场景
        stage.addChild(this.instance.startScene);
    };
    /**
     * 游戏开始（进入游戏场景）
     */
    SceneController.startGameScene = function () {
        var stage = this.instance.stageMain;
        //移除原来的开始场景
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene);
            this.instance.startScene = new StartScene();
        }
        if (this.instance.gameScene.parent) {
            stage.removeChild(this.instance.gameScene);
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.overScene.parent) {
            stage.removeChild(this.instance.overScene);
            this.instance.overScene = new OverScene();
        }
        GameData.distance = 0;
        GameData.speed = 10;
        this.loadLevelData();
        GameData.elements = GameData.elements.concat();
        stage.addChild(this.instance.gameScene);
    };
    SceneController.loadLevelData = function () {
        var levelData = RES.getRes("config_json");
        GameData.elements = levelData.elements;
        GameData.maxMileage = levelData.properties.maxMileage;
    };
    SceneController.GameEnd = function () {
        this.instance.gameScene.stopTicker();
        var stage = this.instance.stageMain;
        stage.addChild(this.instance.overScene);
    };
    return SceneController;
}());
__reflect(SceneController.prototype, "SceneController");
//# sourceMappingURL=SceneController.js.map