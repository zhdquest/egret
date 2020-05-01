class CreateEnemy extends GameObject{
	private enemyData:ElementData;

	public constructor(objData:ElementData) {
		super();
		this.enemyData = objData;
		this.init();

	}

	private init(){
		let enemy:egret.Bitmap = createBitmapByName("enemy_png");
		this.addChild(enemy);
	}

	update(timeStamp:number){
		this.x -= GameData.speed;
	}
}