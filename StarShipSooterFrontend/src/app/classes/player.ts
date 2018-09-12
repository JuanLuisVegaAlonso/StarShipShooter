import { GameObject } from "./GameObject";
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
    constructor(id:number){
        super();
        this.id =id;
        this.weapon = WeaponFactory.createWeapon(this.locationInfo);
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
        this.locationInfo = this.physicsController.getNextLocationInfo();
        this.weapon.nextStep(context);
        this.draw(context);
        this.physicsController.resetEngineForce();
        this.physicsController.resetTurning();
    }
    
    
    public draw(context: CanvasRenderingContext2D) {
        this.shape.draw(context,this.locationInfo);
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
         return this.weapon.shoot(this.locationInfo);
    }
}