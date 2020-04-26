class GameScene extends egret.DisplayObjectContainer{

	public constructor() {
		super();
		this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
	}

	//声明
	private pWorld:p2.World;
	private factor:number=30; //1米~30像素
	private thePlayer:p2.Body;
	private upBtn:egret.Bitmap = createBitmapByName("up_png");
	private downBtn:egret.Bitmap=createBitmapByName("down_png");
	private leftBtn:egret.Bitmap = createBitmapByName("left_png");
	private rightBtn:egret.Bitmap = createBitmapByName("right_png");
	private materialB;
	


    private initView(){	
		this.createSence(); 
		this.createThings();
    }


	//创建游戏场景
	private createSence(){
		//创建游戏背景
		let bg:egret.Bitmap = createBitmapByName("bg_jpg");
		bg.width = this.stage.stageWidth;
		bg.height = this.stage.stageHeight;
		this.addChild(bg);
		//创建移动操作盘
		let move:egret.Sprite=new egret.Sprite();
		move.graphics.beginFill(999595,0.5);
		move.graphics.drawRect(780,385,200,200);
		move.graphics.endFill();
		this.upBtn.x=845;
		this.upBtn.y=385;
		this.downBtn.x=845;
		this.downBtn.y=504;
		this.leftBtn.x=780;
		this.leftBtn.y=445;	
		this.rightBtn.x=900;
		this.rightBtn.y=450;
		this.addChild(move);
		move.addChild(this.upBtn);
		move.addChild(this.downBtn);
		move.addChild(this.leftBtn);
		move.addChild(this.rightBtn);
	}

	private createWorld(){
		var wrd:p2.World=new p2.World();
		wrd=new p2.World();
		wrd.gravity=[0,0];
		this.pWorld=wrd;
	}

	//创建物理场景
	private createPhysics(id:number,m:number,w:number,h:number,resid:string,x0:number,y0:number):p2.Body{
		var pShape:p2.Box=new p2.Box({width:w,height:h});
		var pBody:p2.Body=new p2.Body({mass:m,fixedRotation:true});
		pBody.id=id;
		pBody.position[0]=x0+w/2;
		pBody.position[1]=y0+h/2;
		pBody.addShape(pShape);
		pBody.shapes[0].material=this.materialB;
		this.pWorld.addBody(pBody);
		this.bindAsset(pBody,pShape,resid);
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
		this.pWorld.step(2.5);
		
		this.pWorld.bodies.forEach(function(b:p2.Body){
			if(b.displays!=null){
				b.displays[0].x=b.position[0];
				b.displays[0].y=b.position[1];
			}

			var n:number=1;
			if(b.id==1 && b.collisionResponse==true && this.n<=1){
				if((b.position[0]-20)%30!=0 || (b.position[1]-15)%30!=0){
					
					if((b.position[0]-20)%30<=10 || (b.position[1]-15)%30<=10){

						b.position[0]-=b.position[0]%30;
						b.position[1]-=b.position[1]%30;
						this.n++;
					}
					else{
						b.position[0]+=(30-b.position[0]%30);
						b.position[1]+=(30-b.position[1]%30);
						this.n++;
					}
					
				}
			}
			

		})
	}
	

	//创建玩家
	private createPlayer(){
		var playerShape:p2.Box=new p2.Box({width:30,height:30});
		this.thePlayer=new p2.Body({mass:1,position:[20,555]});
		this.thePlayer.id=0;
		this.thePlayer.addShape(playerShape);
		this.pWorld.addBody(this.thePlayer);
		this.bindAsset(this.thePlayer,playerShape,"player_jpg");
	}

	//点击移动按钮
    private onClickView(){
	
		this.upBtn.touchEnabled=true;
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向上移动");
			this.thePlayer.force=[0,-1];
		},this)
		this.downBtn.touchEnabled=true;
		this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向下移动");	
			this.thePlayer.force=[0,1];
		},this)
		this.leftBtn.touchEnabled=true;
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向左移动");	
			this.thePlayer.force=[-1,0];
		},this)
		this.rightBtn.touchEnabled=true;
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向右移动");	
			this.thePlayer.force=[1,0];
		},this)
	
    }


	private pWall:Array<p2.Body>;//墙壁
	private pStone:Array<p2.Body>;//石头
	private pBox:Array<p2.Body>;//可移动盒子
	private pKey:Array<p2.Body>;//钥匙
	private pEnemy:Array<p2.Body>;//敌人
	private pEnd:Array<p2.Body>;//终点

	private pThings:Array<p2.Body>;

	private createThings(){
		this.addEventListener(egret.Event.ENTER_FRAME,this.run,this);
		this.createWorld();
		this.createPhysics(1,0,0,0,"up_png",0,0);//？
		this.createPlayer();

		 var materialA=new p2.Material(0);
	    this.materialB=new p2.Material(1);
		this.thePlayer.shapes[0].material=materialA;
		var contactMaterialAB:p2.ContactMaterial=new p2.ContactMaterial(materialA,this.materialB);
		var contactMaterialBB:p2.ContactMaterial=new p2.ContactMaterial(this.materialB,this.materialB);
		contactMaterialAB.friction=0;
		contactMaterialBB.friction=0;
		this.pWorld.addContactMaterial(contactMaterialAB);


		this.pWall=[
			this.createPhysics(2,0,20,600,"wall_left_jpg",0,0),
			this.createPhysics(2,0,20,600,"wall_left_jpg",980,0),
			this.createPhysics(2,0,1000,15,"wall_up_jpg",0,0),
			this.createPhysics(2,0,1000,15,"wall_up_jpg",0,585),
			this.createPhysics(2,0,10,200,"move_left_jpg",770,385),
			this.createPhysics(2,0,210,10,"move_up_jpg",770,375)
		];
		
		this.pStone=[
			this.createPhysics(1,0,30,30,"stone_jpg",170,525),
			this.createPhysics(1,0,30,30,"stone_jpg",50,435),
			this.createPhysics(1,0,30,30,"stone_jpg",380,525),
			this.createPhysics(1,0,30,30,"stone_jpg",350,525),
			this.createPhysics(1,0,30,30,"stone_jpg",320,525),
			this.createPhysics(1,0,30,30,"stone_jpg",260,495),
			this.createPhysics(1,0,30,30,"stone_jpg",290,525),
			this.createPhysics(1,0,30,30,"stone_jpg",170,375),
			this.createPhysics(1,0,30,30,"stone_jpg",200,495),
			this.createPhysics(1,0,30,30,"stone_jpg",230,465),
			this.createPhysics(1,0,30,30,"stone_jpg",50,285),
			this.createPhysics(1,0,30,30,"stone_jpg",110,315),
			this.createPhysics(1,0,30,30,"stone_jpg",380,465),
			this.createPhysics(1,0,30,30,"stone_jpg",860,105),
			this.createPhysics(1,0,30,30,"stone_jpg",80,315),
			this.createPhysics(1,0,30,30,"stone_jpg",410,405),
			this.createPhysics(1,0,30,30,"stone_jpg",470,375),
			this.createPhysics(1,0,30,30,"stone_jpg",350,495),
			this.createPhysics(1,0,30,30,"stone_jpg",500,375),
			this.createPhysics(1,0,30,30,"stone_jpg",20,465),
			this.createPhysics(1,0,30,30,"stone_jpg",230,165),
			this.createPhysics(1,0,30,30,"stone_jpg",200,165),
			this.createPhysics(1,0,30,30,"stone_jpg",170,195),
			this.createPhysics(1,0,30,30,"stone_jpg",320,45),
			this.createPhysics(1,0,30,30,"stone_jpg",290,75),
			this.createPhysics(1,0,30,30,"stone_jpg",290,195),
			this.createPhysics(1,0,30,30,"stone_jpg",320,315),
			this.createPhysics(1,0,30,30,"stone_jpg",350,135),
			this.createPhysics(1,0,30,30,"stone_jpg",320,105),
			this.createPhysics(1,0,30,30,"stone_jpg",380,375),
			this.createPhysics(1,0,30,30,"stone_jpg",230,315),
			this.createPhysics(1,0,30,30,"stone_jpg",200,345),
			this.createPhysics(1,0,30,30,"stone_jpg",410,345),
			this.createPhysics(1,0,30,30,"stone_jpg",590,285),
			this.createPhysics(1,0,30,30,"stone_jpg",560,315),
			this.createPhysics(1,0,30,30,"stone_jpg",530,345),
			this.createPhysics(1,0,30,30,"stone_jpg",470,135),
			this.createPhysics(1,0,30,30,"stone_jpg",830,135),
			this.createPhysics(1,0,30,30,"stone_jpg",740,375),
			this.createPhysics(1,0,30,30,"stone_jpg",380,45),
			this.createPhysics(1,0,30,30,"stone_jpg",620,135),
			this.createPhysics(1,0,30,30,"stone_jpg",590,165),
			this.createPhysics(1,0,30,30,"stone_jpg",560,195),
			this.createPhysics(1,0,30,30,"stone_jpg",800,165),
			this.createPhysics(1,0,30,30,"stone_jpg",590,495),
			this.createPhysics(1,0,30,30,"stone_jpg",530,435),
			this.createPhysics(1,0,30,30,"stone_jpg",680,345),
			this.createPhysics(1,0,30,30,"stone_jpg",650,285),
			this.createPhysics(1,0,30,30,"stone_jpg",50,315),
		];

		this.pBox=[
			this.createPhysics(1,0.1,30,30,"box_jpg",770,165),
			this.createPhysics(1,0.1,30,30,"box_jpg",740,135),
			this.createPhysics(1,0.1,30,30,"box_jpg",710,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",680,75),
			this.createPhysics(1,0.1,30,30,"box_jpg",650,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",710,345),
			this.createPhysics(1,0.1,30,30,"box_jpg",620,255),
			this.createPhysics(1,0.1,30,30,"box_jpg",380,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",440,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",470,165),
			this.createPhysics(1,0.1,30,30,"box_jpg",500,195),
			this.createPhysics(1,0.1,30,30,"box_jpg",530,225),
			this.createPhysics(1,0.1,30,30,"box_jpg",560,255),
			this.createPhysics(1,0.1,30,30,"box_jpg",260,285),
			this.createPhysics(1,0.1,30,30,"box_jpg",290,255),
			this.createPhysics(1,0.1,30,30,"box_jpg",380,315),
			this.createPhysics(1,0.1,30,30,"box_jpg",380,285),
			this.createPhysics(1,0.1,30,30,"box_jpg",350,255),
			this.createPhysics(1,0.1,30,30,"box_jpg",320,225),
			this.createPhysics(1,0.1,30,30,"box_jpg",350,15),
			this.createPhysics(1,0.1,30,30,"box_jpg",260,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",410,435),
			this.createPhysics(1,0.1,30,30,"box_jpg",230,135),
			this.createPhysics(1,0.1,30,30,"box_jpg",500,405),
			this.createPhysics(1,0.1,30,30,"box_jpg",440,375),
			this.createPhysics(1,0.1,30,30,"box_jpg",650,555),
			this.createPhysics(1,0.1,30,30,"box_jpg",620,525),
			this.createPhysics(1,0.1,30,30,"box_jpg",560,465),
			this.createPhysics(1,0.1,30,30,"box_jpg",410,495),
			this.createPhysics(1,0.1,30,30,"box_jpg",110,495),
			this.createPhysics(1,0.1,30,30,"box_jpg",230,435),
			this.createPhysics(1,0.1,30,30,"box_jpg",410,555),
			this.createPhysics(1,0.1,30,30,"box_jpg",140,525),
			this.createPhysics(1,0.1,30,30,"box_jpg",200,405),
			this.createPhysics(1,0.1,30,30,"box_jpg",140,345),
			this.createPhysics(1,0.1,30,30,"box_jpg",110,375),
			this.createPhysics(1,0.1,30,30,"box_jpg",80,405),
			this.createPhysics(1,0.1,30,30,"box_jpg",80,465),
			this.createPhysics(1,0.1,30,30,"box_jpg",110,195),
			this.createPhysics(1,0.1,30,30,"box_jpg",20,105),
			this.createPhysics(1,0.1,30,30,"box_jpg",50,135),
			this.createPhysics(1,0.1,30,30,"box_jpg",80,165),
			this.createPhysics(1,0.1,30,30,"box_jpg",140,225),
			this.createPhysics(1,0.1,30,30,"box_jpg",140,555),
		];
		this.pKey=[

		];
		this.pEnemy=[

		];
		this.pEnd=[

		];

	
	   

	}
	

}