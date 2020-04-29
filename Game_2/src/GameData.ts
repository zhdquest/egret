class GameData{
/**
	 * 走过的距离 用于计算位置
	 */
	static distance:number;


	//从config文件中读取数据

	/**
	 * 存放配置文件中读取的障碍物数据
	 */
	static elements:any[] = [];


	/**
	 * 障碍物最远的里程数
	 */
	static maxMileage:number;

	/**
	 * 障碍物产生的轮数
	 */
	static rounds:number = 0;
}


