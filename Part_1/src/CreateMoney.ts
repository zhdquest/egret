class CreateMoney extends GameObject{
	private moneyData:ElementData;

	public constructor(objData:ElementData) {
		super();
		this.moneyData = objData;
		this.init();

	}

	private init(){
		let money:egret.Bitmap = createBitmapByName("money_png");
		this.addChild(money);
	}

	update(timeStamp:number){
		this.x -= GameData.speed;
	}
}