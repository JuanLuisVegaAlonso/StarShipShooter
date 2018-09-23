import { GameObject, GameObjectDependencies } from "./GameObject";
import { Drawable } from "./drawable";
import { PlayerShape } from "./playerShape";
import { frameRate } from "../constants/gameConfig";
import { Point } from "./point";
import { Vector } from "./vector";
import { Weapon } from "./weapons/weapon";
import { WeaponFactory } from "./weapons/weaponFactory";
import { Bullet } from "./weapons/bullets/bullet";
import { LocationInfo } from "./locationInfo";
import { PhysicsController } from "./physics/physics-controller";
import { WallCollisionDetector, Wall } from "./physics/wall-collision-detector";

export class Player extends GameObject {
    id:number;
    weapon:Weapon;
    constructor(id:number,gameObjectDependencies:GameObjectDependencies){
        super(gameObjectDependencies);
        this.id =id;
        this.weapon = WeaponFactory.createWeapon(gameObjectDependencies);
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
        this.weapon.nextStep(context);
        this.draw(context,this.physicsController.locationInfo);
        this.physicsController.resetEngineForce();
        this.physicsController.resetTurning();
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