import { GameObject } from "../../GameObject";
import { Player } from "../../player";
import { Vector } from "../../vector";
import { Weapon } from "../weapon";
import { BulletShape } from "./bulletShape";
import { PhysicsController } from "../../physics/physics-controller";
import { WallCollisionDetector, Wall } from "../../physics/wall-collision-detector";


export class Bullet extends GameObject {
    color:string;
    private bulletRadius:number;

    constructor(){
        super();
        this.physicsController = new PhysicsController();
        this.wallCollisionDetector = new WallCollisionDetector(this.physicsController);
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
        this.locationInfo = this.physicsController.getNextLocationInfo();
        this.draw(context);
    }

    public draw(context:CanvasRenderingContext2D){
        this.shape.draw(context,this.locationInfo);
    }
}