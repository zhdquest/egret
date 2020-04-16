class GameScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
	}

	private upBtn:egret.Bitmap = createBitmapByName("up_png");
	private downBtn:egret.Bitmap=createBitmapByName("down_png");
	private leftBtn:egret.Bitmap = createBitmapByName("left_png");
	private rightBtn:egret.Bitmap = createBitmapByName("right_png");
    private initView(){
		let bg:egret.Bitmap = createBitmapByName("field_1_jpg");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);

		let move:egret.Sprite=new egret.Sprite();
		move.graphics.beginFill(999595,0.5);
		move.graphics.drawRect(800,400,200,200);
		move.graphics.endFill();

		this.upBtn.x=865;
		this.upBtn.y=400;
		this.downBtn.x=865;
		this.downBtn.y=520;
		this.leftBtn.x=800;
		this.leftBtn.y=460;	
		this.rightBtn.x=920;
		this.rightBtn.y=465;
		
		this.addChild(move);
		move.addChild(this.upBtn);
		move.addChild(this.downBtn);
		move.addChild(this.leftBtn);
		move.addChild(this.rightBtn);

    }

    private onClickView(){
		this.upBtn.touchEnabled=true;
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向上移动");				
		},this)
		this.downBtn.touchEnabled=true;
		this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向下移动");		
		},this)
		this.leftBtn.touchEnabled=true;
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向左移动");		
		},this)
		this.rightBtn.touchEnabled=true;
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向右移动");		
		},this)
    }

	public startGame(){

	}



	public startTicker(){
		egret.ticker.$startTick(this.update,this);
	}
	public stopTicker(){
		egret.ticker.$stopTick(this.update,this);
	}
	private update(timeStap:number):boolean{
		if(!GameData.hasStart){
			return true;
		}
	}
	

}