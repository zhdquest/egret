 class StartScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
	}

	 static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    private initView(){
		let bg:egret.Bitmap = createBitmapByName("bg_640_png");
		this.addChild(bg);
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;

		//开始游戏的按钮
		let startBtn:egret.Bitmap = createBitmapByName("start_png");
		this.addChild(startBtn);
		startBtn.x = (this.stage.stageWidth - startBtn.width)/2;
		startBtn.y = (this.stage.stageHeight - startBtn.height)/2;
		startBtn.touchEnabled = true;
		startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("开始游戏");
			SceneController.startGameScene();
		},this)
	}
    
}