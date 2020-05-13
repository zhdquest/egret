class GameScene extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
        this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_BEGIN,this.onClickView,this);
    }

    private pWorld:p2.World;
    private thePlayer:p2.Body;
	private wheel:p2.Body;
    
    private initView(){

        let bg:egret.Bitmap = createBitmapByName("bg_640_png");
        bg.width =640;
		bg.height =1136;
        bg.x=0;
        bg.y=0;
		this.addChild(bg);
        this.createThings();
		
        
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

        });

		this.checkMoveThings();
		//this.checkJoint(this.pWorld,this.thePlayer);

    }

	private checkMoveThings(){
		this.moveThings[0].position[0]+=1;
		this.moveThings[1].position[0]-=1;
		this.moveThings[2].position[0]+=1;

		if(this.moveThings[0].position[0]>900){
            this.moveThings[0].position[0]=0;
        }
        if(this.moveThings[1].position[0] < -200) {
            this.moveThings[1].position[0] = 640;
        }
        if(this.moveThings[2].position[0] > 900) {
            this.moveThings[2].position[0] =0;  
        }
	}

	/*private checkJoint(world: p2.World,body: p2.Body):boolean{
		
		var result = false;
        //console.log(world.broadphase.getCollisionPairs[0]);
        for(var i = 0;i < world.broadphase.getCollisionPairs.length;i++) {
            var c = world.broadphase.getCollisionPairs[i];
            if(c.bodyA === body || c.bodyB === body) {
                this.createJoint(this.thePlayer,this.wheel);
				result = true;
            }
        }
        return result;
    }
	*/
   
	//创建玩家
	private createPlayer(){
		var playerShape:p2.Box=new p2.Box({width:40,height:50});
		this.thePlayer=new p2.Body({mass:1,position:[300,450]});
		this.thePlayer.id=0;
		this.thePlayer.addShape(playerShape);
		this.pWorld.addBody(this.thePlayer);
		this.bindAsset(this.thePlayer,playerShape,"player_png");
	}
	

	private fixedThings:Array<p2.Body>;
	private moveThings:Array<p2.Body>;
    private createThings(){

		this.addEventListener(egret.Event.ENTER_FRAME,this.run,this);  
		this.createWorld();
        this.createPhysics(1,0,0,0,"ground_640_png",0,0);//?
		this.createPlayer();

		this.fixedThings=[
			this.createPhysics(1,0,640,150,"ground_640_png",0,1000),
			this.createPhysics(1,0,1,1136,"bg_640_png",0,0),
			this.createPhysics(1,0,1,1136,"bg_640_png",639,0),
		];
		this.moveThings=[
			this.createPhysics(2,0,180,10,"plane1_png",50,900),
			this.createPhysics(2,0,180,10,"plane1_png",200,700),
			this.createPhysics(2,0,180,10,"plane1_png",400,500),
		];

		var materialA=new p2.Material(0);
	    var materialB=new p2.Material(1);
		this.thePlayer.shapes[0].material=materialA;
		this.fixedThings[0].shapes[0].material=materialB;
		var contactMaterialAB:p2.ContactMaterial=new p2.ContactMaterial(materialA,materialB);
		contactMaterialAB.friction=0;
		contactMaterialAB.restitution=1;
		this.pWorld.addContactMaterial(contactMaterialAB);
       

    }

/*	private createJoint(bodyA:p2.Body,bodyB:p2.Body){
		var localAngleB:number=bodyB.angle-bodyA.angle;
		var localOffsetB:number[]=[];
		p2.vec2.sub(localOffsetB,bodyB.position,bodyA.position);
		bodyA.vectorToLocalFrame(localOffsetB,localOffsetB);
		var joint:p2.LockConstraint=new p2.LockConstraint(bodyA,bodyB,{localAngleB:localAngleB,localOffsetB:localOffsetB});
		this.pWorld.addConstraint(joint);
	}
*/
    //点击移动按钮
    private onClickView(e:egret.TouchEvent){
		if(this.checkIfCanJump(this.pWorld,this.thePlayer)==true){
			if(e.stageX < this.thePlayer.position[0]-50){
			this.thePlayer.force=[-3,-15];
				console.log("向左跳");
			}
			else if(e.stageX > this.thePlayer.position[0]+50){
				this.thePlayer.force=[3,-15]
				console.log("向右跳");
			}
			else{
				this.thePlayer.force=[0,-15];
				console.log("向上跳");
			}
		}	
	}
	 private checkIfCanJump(world: p2.World,body: p2.Body):boolean{
        var yAxis = [0,1];
		var result = false;
        //console.log(world.broadphase.getCollisionPairs[0]);
        for(var i = 0;i < world.narrowphase.contactEquations.length;i++) {
            var c = world.narrowphase.contactEquations[i];
            if(c.bodyA === body || c.bodyB === body) {
                var d = p2.vec2.dot(c.normalA,yAxis); // Normal dot Y-axis
                if(c.bodyA === body) d *= -1;
                egret.log("d value:"+d);
                if(d < -0.5) result = true;
            }
        }
        return result;
    }
	
}


