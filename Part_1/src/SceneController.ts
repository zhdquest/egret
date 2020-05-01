class SceneController {

	private stageMain:egret.DisplayObjectContainer;

	private startScene:StartScene;
	private gameScene:GameScene;
	private overScene:OverScene;
	public constructor() {
		this.startScene = new StartScene();
		this.gameScene = new GameScene();
		this.overScene = new OverScene();
	}
	static sceneController:SceneController;
	static get instance(){
		if(!this.sceneController){
			this.sceneController = new SceneController();
		}
		return this.sceneController;
	}

	public  setStage(s:egret.DisplayObjectContainer){
		this.stageMain = s;
	}

	/**
	 * 游戏初始化（进入开始游戏场景）
	 */
	static initGame(){
		let stage:egret.DisplayObjectContainer = this.instance.stageMain;
		if( this.instance.gameScene.parent){
			stage.removeChild( this.instance.gameScene );
			this.instance.gameScene = new GameScene();
		}
		if( this.instance.overScene.parent){
			stage.removeChild(this.instance.overScene);
			this.instance.overScene = new OverScene();
		}
		//加入开始场景
		stage.addChild( this.instance.startScene );
	}
	/**
	 * 游戏开始（进入游戏场景）
	 */
	static startGameScene(){
		let stage:egret.DisplayObjectContainer = this.instance.stageMain;

		//移除原来的开始场景
		if(this.instance.startScene.parent){
			stage.removeChild( this.instance.startScene );
			this.instance.startScene = new StartScene();
		}
		if(this.instance.gameScene.parent){
			stage.removeChild( this.instance.gameScene );
			this.instance.gameScene = new GameScene();
		}
		if(this.instance.overScene.parent){
			stage.removeChild( this.instance.overScene );
			this.instance.overScene = new OverScene();
		}
		

		GameData.distance = 0;
		GameData.speed=10;
		this.loadLevelData();
        GameData.elements = GameData.elements.concat();

		stage.addChild( this.instance.gameScene );

		
	}
	
	static loadLevelData(){
        let levelData = RES.getRes("config_json");
		GameData.elements = levelData.elements;
		GameData.maxMileage = levelData.properties.maxMileage;     
	
	} 
	


	static GameEnd(){
		this.instance.gameScene.stopTicker();
		let stage = this.instance.stageMain;
		stage.addChild( this.instance.overScene );
	}

}