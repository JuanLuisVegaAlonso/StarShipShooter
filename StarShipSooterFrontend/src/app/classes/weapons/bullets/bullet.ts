import { GameObject } from "../../GameObject";
import { Vector } from "../../vector";
import { Weapon } from "../weapon";
import { BulletShape } from "./bulletShape";
import { PhysicsController } from "../../physics/physics-controller";
import { WallCollisionDetector, Wall } from "../../physics/wall-collision-detector";
import { LocationInfo } from "../../locationInfo";


export class Bullet extends GameObject {
    color:string;
    private _onWallColission: (bullet:Bullet) => void;
    private _weaponOnWallColission: (bullet: Bullet) => void;
    private bulletRadius:number;

    constructor(gameObjectDependencies,onWallColission: (bullet:Bullet) => void,weaponOnWallColission: (bullet:Bullet) => void){
        super(gameObjectDependencies);
        this._onWallColission = onWallColission;
        this._weaponOnWallColission = weaponOnWallColission;
    }

    public setSpeed(speed:number){
        const vx = Math.sin(this.physicsController.locationInfo.rotation )*speed;
        const vy =  Math.cos(this.physicsController.locationInfo.rotation )*speed;
        this.physicsController.velocity = new Vector(vx,vy);
    }

    public setBulletRadius(getBulletRadius:() => number){
        this.shape = new BulletShape(getBulletRadius);
    }

    public nextStep(context:CanvasRenderingContext2D){
        this.physicsController.nextLocationInfo();
        if(this.wallCollisionDetector.getCollitions().length > 0){
            this._onWallColission(this);
            this._weaponOnWallColission(this);
        }
        this.draw(context,this.physicsController.locationInfo);
    }

    public draw(context:CanvasRenderingContext2D,locationInfo:LocationInfo){
        this.shape.draw(context,locationInfo);
    }
}