import { GameObject, GameObjectDependencies } from "../GameObject";
import { Drawable } from "../drawable";
import { PlayerShape } from "../playerShape";
import { frameRate } from "../../constants/gameConfig";
import { Point } from "../point";
import { Vector } from "../vector";
import { Weapon } from "../weapons/weapon";
import { WeaponFactory } from "../weapons/weaponFactory";
import { Bullet } from "../weapons/bullets/bullet";
import { LocationInfo } from "../locationInfo";
import { PhysicsController } from "../physics/physics-controller";
import { WallCollisionDetector, Wall } from "../physics/wall-collision-detector";
import { width } from "../../constants/canvasSize";
import { BulletFactory } from "../weapons/bullets/bulletFactory";
import { Actions } from "../playerController";

export class Player extends GameObject {
    id:number;
    weapon:Weapon;
    private _bulletFactory: BulletFactory;
    constructor(id:number,gameObjectDependencies:GameObjectDependencies,weapon:Weapon){
        super(gameObjectDependencies);
        this.id =id;
        this.weapon = weapon;
    }
    public initShape() {
        if (this.size && this.color) {
            this.shape = new PlayerShape(this.size, this.color);
        }
        else if (this.size) {
            this.shape = new PlayerShape(this.size);
        }
        else {
            throw Error("Size is not defined");
        }
    }
    public nextStep(context: CanvasRenderingContext2D) {
        this.physicsController.nextLocationInfo();
        this.handleWallColisions();
        this.weapon.nextStep(context);
        this.draw(context,this.physicsController.locationInfo);
        this.physicsController.resetEngineForce();
        this.physicsController.resetTurning();
    }
    
    private handleWallColisions(){
        const collisions = this.wallCollisionDetector.getCollitions();
            for(let collision of collisions){
                switch (collision){
                    case Wall.LEFT:
                    this.physicsController.velocity.x = 0;
                    this.physicsController.locationInfo.position.x = 0;
                    break;
                    case Wall.TOP:
                    this.physicsController.velocity.y = 0;
                    this.physicsController.locationInfo.position.y = 0;
                    break;
                    case Wall.RIGHT:
                        this.physicsController.velocity.x = 0;
                        // TODO add gameSize
                        this.physicsController.locationInfo.position.x = width;
                    break;
                    case Wall.BOT:
                        this.physicsController.velocity.y = 0;
                        this.physicsController.locationInfo.position.y = width;
                    break;
                }
            }
    }
    public evaluateUserInput(actions: Actions[]){
        for(const action of actions){
            switch (action){
                case Actions.FORWARD:
                    this.forward();
                break;
                case Actions.BACKWARD:
                    this.backward();
                break;
                case Actions.TURN_RIGHT:
                    this.changeRotation(true);
                break;
                case Actions.TURN_LEFT:
                    this.changeRotation(false);
                break;
                case Actions.SHOOT:
                    this.shoot();
                break;
            }
        }
    }
    public draw(context: CanvasRenderingContext2D,locationInfo:LocationInfo) {
        this.shape.draw(context,locationInfo);
    }
    public changeRotation(clockWise: boolean) {
        this.physicsController.changeRotation(clockWise);
    }

    public forward() {
        this.physicsController.forward();
    }
    public backward() {
        this.physicsController.backward();
    }

    public shoot(): boolean {
         return this.weapon.shoot(this.physicsController.locationInfo);
    }
}