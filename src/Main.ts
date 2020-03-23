class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    onAddToStage(){
        var bg:egret.Shape=new egret.Shape();
        bg.graphics.beginFill(0x336699);
        bg.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        bg.graphics.endFill();
        this.addChild(bg);
        var tx:egret.TextField=new egret.TextField();
        tx.text="Hello world";
        tx.size=32;
        tx.x=(this.stage.width-tx.width)/2;
        tx.y=(this.stage.height-tx.height)/2;
        this.addChild(tx);
    }
}