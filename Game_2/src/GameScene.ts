interface ElementData{
    "type": string ;
    "distance": number;
    "x":number;
    "y": number;
}

class GameScene extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
        this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onClickView,this);
    }

    private pWorld:p2.World;
    private thePlayer:p2.Body;
    private ground:p2.Body;
    private upBtn:egret.Bitmap = createBitmapByName("move_up_png");
	private downBtn:egret.Bitmap=createBitmapByName("move_down_png");
	private leftBtn:egret.Bitmap = createBitmapByName("move_left_png");
	private rightBtn:egret.Bitmap = createBitmapByName("move_right_png");
    private fireBtn:egret.Bitmap = createBitmapByName("fire_bg_png");
    private jumpBtn:egret.Bitmap = createBitmapByName("jump_bg_png");
    private buttleNum:egret.Bitmap = createBitmapByName("buttle_bg_png");
    private moneyNum:egret.Bitmap = createBitmapByName("money_bg_png");
    private buttle_Number:egret.TextField;
    private money_Number:egret.TextField;


    private initView(){

        let bg:egret.Bitmap = createBitmapByName("Game_bg_png");
        bg.width = 1000;
		bg.height = 600;
        bg.x=0;
        bg.y=0;
		this.addChild(bg);

        //this.startTicker();

        this.createThings();
        this.createScene();
        
    }

    private createScene(){      
        let tool_bg:egret.Bitmap = createBitmapByName("tool_bg_png");
        tool_bg.width=200;
        tool_bg.height=1000;
        tool_bg.x=1000;
        tool_bg.y=0;
        this.addChild(tool_bg);

        let move:egret.Sprite=new egret.Sprite();
        move.graphics.beginFill(0x00f39800);
		move.graphics.drawRect(1000,400,200,200);
		move.graphics.endFill();
		this.upBtn.x=1073;
		this.upBtn.y=407;
		this.downBtn.x=1073;
		this.downBtn.y=520;
		this.leftBtn.x=1011;
		this.leftBtn.y=466;	
		this.rightBtn.x=1119;
		this.rightBtn.y=466;
		this.addChild(move);
		move.addChild(this.upBtn);
		move.addChild(this.downBtn);
		move.addChild(this.leftBtn);
		move.addChild(this.rightBtn);

        let operate:egret.Sprite=new egret.Sprite();
        operate.graphics.beginFill(0x00f39800);
		operate.graphics.drawRect(1000,190,200,200);
		operate.graphics.endFill();
        this.fireBtn.x=1017;
        this.fireBtn.y=213;
        this.jumpBtn.x=1017;
        this.jumpBtn.y=300;
        this.addChild(operate);
        operate.addChild(this.fireBtn);
        operate.addChild(this.jumpBtn);
        
        let statistics:egret.Sprite=new egret.Sprite();
        statistics.graphics.beginFill(0x00f39800);
		statistics.graphics.drawRect(1000,0,200,180);
		statistics.graphics.endFill();
        this.buttleNum.x=1005;
        this.buttleNum.y=19;
        this.moneyNum.x=1005;
        this.moneyNum.y=96;
        this.addChild(statistics);
        statistics.addChild(this.buttleNum);
        statistics.addChild(this.moneyNum);
        let buttle_tx:egret.TextField = new egret.TextField();
		buttle_tx.text = "子弹数:";
		buttle_tx.textColor = 0xffffff;
		buttle_tx.size = 30;
		buttle_tx.x = 1014;
		buttle_tx.y = 35;
		statistics.addChild(buttle_tx);
        this.buttle_Number = new egret.TextField();
		this.buttle_Number.size = 30;
		this.buttle_Number.x = buttle_tx.width + 50;
		this.buttle_Number.y =35;
		statistics.addChild(this.buttle_Number);
		this.changeButtleCount(0);

        let money_tx:egret.TextField = new egret.TextField();
		money_tx.text = "金币数：";
		money_tx.textColor = 0xffffff;
		money_tx.size = 30;
		money_tx.x = 1014;
		money_tx.y = 108;
		statistics.addChild(money_tx);
        this.money_Number = new egret.TextField();
		this.money_Number.textColor = 0xffffff;
		this.money_Number.size = 60;
		this.money_Number.x =money_tx.width + 50;
		this.money_Number.y = 108;
		statistics.addChild( this.money_Number );
		this.changeMoneyCount(0);

    }

    private changeButtleCount(cnt:number){
		this.buttle_Number.text = cnt.toString();
	}
	private changeMoneyCount(cnt:number){
		this.money_Number.text = cnt.toString();
	}


    //创建物理场景
    private createWorld(){
		var wrd:p2.World=new p2.World();
		wrd=new p2.World();
		wrd.gravity=[0,1];
		this.pWorld=wrd;
	}

	private createPhysics(id:number,m:number,w:number,h:number,resid:string,x0:number,y0:number):p2.Body{
		var pShape:p2.Box=new p2.Box({width:w,height:h});
		var pBody:p2.Body=new p2.Body({mass:m,fixedRotation:true});
		pBody.id=id;
		pBody.position[0]=x0+w/2;
		pBody.position[1]=y0+h/2;
		pBody.addShape(pShape);
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
            //this.ground.position[0]+=GameData.distance;
        })
        this.creatPT();
    }

/*
    public startTicker(){
		egret.ticker.$startTick(this.update,this);
	}
	public stopTicker(){
		egret.ticker.$stopTick(this.update,this);
	}
    private update(timeStap:number):boolean{
        
        return true;
    }
*/	

    private creatPT(){
        let element:ElementData = GameData.elements[0];
        if(element && GameData.distance>=element.distance + GameData.rounds * GameData.maxMileage){
            if(element.type == "ground"){
				console.log("创建ground");
                var groundShape:p2.Box=new p2.Box({width:1000,height:150});
                this.ground=new p2.Body({mass:0});
                this.ground.position[0]=element.x;
                this.ground.position[1]=element.y;
                this.ground.id=1;
                this.ground.addShape(groundShape);
                this.pWorld.addBody(this.ground);
                this.bindAsset(this.ground,groundShape,"ground_png");
            }
            if( GameData.elements.length <= 0){
				//注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
				GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
				console.log( RES.getRes("config_json") )
				GameData.rounds ++;
			}
        }
           /* var materialA=new p2.Material(0);
	        var materialB=new p2.Material(1);
		    this.thePlayer.shapes[0].material=materialA;
		    this.ground.shapes[0].material=materialB;
		    var contactMaterialAB:p2.ContactMaterial=new p2.ContactMaterial(materialA,materialB);
		    contactMaterialAB.friction=0;
		    this.pWorld.addContactMaterial(contactMaterialAB);*/
       
    }

   /* private createGround_1(){
        var groundShape:p2.Box=new p2.Box({width:1000,height:150});
                this.ground=new p2.Body({mass:0});
                this.ground.position[0]=500;
                this.ground.position[1]=525;
                this.ground.id=1;
                this.ground.addShape(groundShape);
                this.pWorld.addBody(this.ground);
                this.bindAsset(this.ground,groundShape,"ground_png");
    }
*/

	//创建玩家
	private createPlayer(){
		var playerShape:p2.Box=new p2.Box({width:40,height:100});
		this.thePlayer=new p2.Body({mass:1,position:[300,425]});
		this.thePlayer.id=0;
		this.thePlayer.addShape(playerShape);
		this.pWorld.addBody(this.thePlayer);
		this.bindAsset(this.thePlayer,playerShape,"player_png");
	}
	

    private createThings(){

		this.addEventListener(egret.Event.ENTER_FRAME,this.run,this);  
		this.createWorld();
        this.createPhysics(1,0,0,0,"stone_png",0,0);//?
		this.createPlayer();
        this.createGround_1();

    }

    //点击移动按钮
    private onClickView(){
	/*
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
    */
		this.leftBtn.touchEnabled=true;
		this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向左移动");	
			GameData.distance-=10;
		},this)
		this.rightBtn.touchEnabled=true;
		this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
			console.log("向右移动");	
			GameData.distance+=10;
		},this)
	
    }
}


