class GameScene extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
	}

	//声明
	private world:p2.World;
	private factor:number=30; //1米~30像素
	private thePlayer:p2.Body;
	private upBtn:egret.Bitmap = createBitmapByName("up_png");
	private downBtn:egret.Bitmap=createBitmapByName("down_png");
	private leftBtn:egret.Bitmap = createBitmapByName("left_png");
	private rightBtn:egret.Bitmap = createBitmapByName("right_png");


    private initView(){	
		this.createSence(); //创建游戏场景
		//创建物理场景
		this.createPhysics(1,50,50,"gress_1_png",10,10);
		this.createPlayer();//创建玩家
    }


	//创建游戏场景
	private createSence(){
		//创建游戏背景
		let bg:egret.Bitmap = createBitmapByName("field_1_jpg");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);
		//创建移动操作盘
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

	//创建物理场景
	private createPhysics(id:number,w:number,h:number,resid:string,x0:number,y0:number):p2.Body{
		var pWorld:p2.World=new p2.World();
		pWorld.gravity=[0,0]; //失重状态
		this.world=pWorld;
		var pShape:p2.Box=new p2.Box({width:w,height:h});
		var pBody:p2.Body=new p2.Body();
		pBody.id=id;
		pBody.position[0]=x0+w/2;
		pBody.position[1]=y0+h/2;
		pBody.addShape(pShape);
		this.world.addBody(pBody);
		this.bindAsset(pBody,pShape,resid);
		this.addEventListener(egret.Event.ENTER_FRAME,this.run,this);
		return pBody;
	}
	private getBitmap(resName):egret.Bitmap{  //为刚体绑定贴图
		var pBitmap:egret.Bitmap=new egret.Bitmap();
		pBitmap.texture=RES.getRes(resName);
		pBitmap.anchorOffsetX=pBitmap.width/2;
		pBitmap.anchorOffsetY=pBitmap.height/2;
		return pBitmap;
	}
	private bindAsset(body:p2.Body,shape:p2.Box,asset:string){  //实现图片素材和刚体的关联
		var img:egret.Bitmap=this.getBitmap(asset);
		img.scaleX=shape.width/img.width;
		img.scaleY=shape.height/img.height;
		this.addChild(img);
		img.x=body.position[0];
		img.y=body.position[1];
		body.displays=[img];
	}
	
	private run(){
		this.world.step(2.5);
		this.world.bodies.forEach(function(b:p2.Body){
			if(b.displays!=null){
				b.displays[0].x=b.position[0];
				b.displays[0].y=b.position[1];
			}
		})
	}
	

	//创建玩家
	private createPlayer(){
		var playerShape:p2.Box=new p2.Box({width:10,height:10});
		this.thePlayer=new p2.Body({position:[100,100]});
		this.thePlayer.addShape(playerShape);
		this.world.addBody(this.thePlayer);
		this.bindAsset(this.thePlayer,playerShape,"flower_1_png");
	}

	//点击移动按钮
    private onClickView(){
	
		this.upBtn.touchEnabled=true;
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向上移动");
			this.thePlayer.position[1]-=10;
		},this)
		this.downBtn.touchEnabled=true;
		this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向下移动");	
			this.thePlayer.position[1]+=10;
		},this)
		this.leftBtn.touchEnabled=true;
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向左移动");	
			this.thePlayer.position[0]-=10;
		},this)
		this.rightBtn.touchEnabled=true;
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向右移动");	
			this.thePlayer.position[0]+=10;
		},this)
	
    }

	
}