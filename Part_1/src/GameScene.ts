interface ElementData{
    "type": string ;
    "distance": number;
    "y": number;
}

class GameScene extends egret.DisplayObjectContainer{

    public constructor(){
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE,this.initView,this);
    }

	private bgContainer:egret.DisplayObjectContainer;
	private rolerContainer:egret.DisplayObjectContainer;

    private distance:egret.TextField;
	//存放 
	private gameObjectList:GameObject[];
	//删除元素
	private deleteObjectList:GameData[];

    private initView(){

		this.bgContainer = new egret.DisplayObjectContainer();
		this.rolerContainer = new egret.DisplayObjectContainer();

		this.addChild( this.bgContainer );
		this.addChild( this.rolerContainer );
			
        let bg:egret.Bitmap = createBitmapByName("bg_640_png");
        bg.width =640;
		bg.height =1136;
        bg.x=0;
        bg.y=0;
		GameData.hasStart = true;
		this.bgContainer.addChild(bg);

		this.gameObjectList = [];
		this.deleteObjectList = [];

        this.createScene();
		this.createGround();
		this.startTicker();
    }

    private createScene(){      

		var spr:egret.Sprite=new egret.Sprite();
		spr.graphics.beginFill(0xa84200);
		spr.graphics.drawRect(20,20,300,100);
		spr.graphics.endFill();
		this.bgContainer.addChild(spr);

        let dis_num:egret.TextField = new egret.TextField();
		dis_num.text = "distance";
		dis_num.textColor = 0xffffff;
		dis_num.size =40;
		dis_num.x =43
		dis_num.y =52;
		spr.addChild(dis_num);
		this.distance = new egret.TextField();
		this.distance.textColor = 0xffffff;
		this.distance.size = 40;
		this.distance.x = dis_num.x + dis_num.width + 20;
		this.distance.y = dis_num.y;
		spr.addChild( this.distance );
		this.changeDistanceCount(0);

    }

	private changeDistanceCount(cnt:number){
		this.distance.text = cnt.toString();
	}


	private ground1:egret.Bitmap;
	private ground2:egret.Bitmap;
	private createGround(){
        let ground1 = createBitmapByName("ground_640_png");
        ground1.y = this.stage.stageHeight - ground1.height;
        this.bgContainer.addChild(ground1);
		this.ground1 = ground1;
        let ground2 = createBitmapByName("ground_640_png");
        ground2.y = this.stage.stageHeight - ground2.height;
        ground2.x = ground1.width;
		console.log( ground2.x);
        this.bgContainer.addChild(ground2);
		this.ground2 = ground2;

	}


    public startTicker(){
		egret.ticker.$startTick(this.update,this);
	}
	public stopTicker(){
		egret.ticker.$stopTick(this.update,this);
	}

  private update(timeStap:number):boolean{
		/*if(!GameData.hasStart){
			return true;
		}*/
		if(GameData.distance<=3000){
        	if( this.ground1.x + this.ground1.width <=0 ){
				this.ground1.x = this.ground2.x + this.ground2.width;
			}
			if( this.ground2.x + this.ground2.width <= 0){
				this.ground2.x = this.ground1.x + this.ground1.width;
			}
			this.ground1.x -= GameData.speed;
			this.ground2.x -= GameData.speed;

			GameData.distance += GameData.speed/2;
			this.changeDistanceCount( GameData.distance);

			for( let obj of this.gameObjectList){
				obj.update(timeStap);
			}
			this.check();
			this.addElement();
			
		}
		else{
			GameData.hasStart = false;
			SceneController.GameEnd;
		}

		return true;	
	}
	

	private addElement(){
		let element:ElementData = GameData.elements[0];
		//获取到element 并且 里程数大于elements的里程数的时候 就创建障碍物
		if( element && GameData.distance >= element.distance){

			if(element.type == "money"){
				console.log("创建money");
				let money = new CreateMoney(element);
				money.x = this.stage.stageWidth;
				money.y = element.y;
				this.rolerContainer.addChild(money);
				console.log(555555);
				this.gameObjectList.push(money);
			}
			if(element.type == "enemy"){
				console.log("创建enemy");
				let enemy = new CreateEnemy(element);
				enemy.x = this.stage.stageWidth;
				enemy.y = element.y;
				this.rolerContainer.addChild(enemy);
				console.log(555555);
				this.gameObjectList.push(enemy);
			}

			GameData.elements.splice(0,1);
			if( GameData.elements.length <= 0){
				//注意 此处必须使用 concat 将一个数组赋值给另一个数组 ！！！
				GameData.elements = GameData.elements.concat(RES.getRes("config_json").elements);
				console.log( RES.getRes("config_json") )
				GameData.rounds ++;
			}

		}
	}

	private check(){
		for( let things of this.gameObjectList){
			if( things.x + things.width + 50 < 0){
				this.deleteObjectList.push(things);
			}
		
			for( let obj of this.deleteObjectList){
				this.rolerContainer.removeChild( <GameObject>obj);
				this.gameObjectList.splice( this.gameObjectList.indexOf(< GameObject>obj),1);
			}
			this.deleteObjectList.length = 0;
			
		}
	}

}


