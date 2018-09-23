import { GameObject } from "../../GameObject";
import { Vector } from "../../vector";
import { Weapon } from "../weapon";
import { BulletShape } from "./bulletShape";
import { PhysicsController } from "../../physics/physics-controller";
import { WallCollisionDetector, Wall } from "../../physics/wall-collision-detector";
import { LocationInfo } from "../../locationInfo";

export enum BulletEvent{
    WALL_HIT
}
export class Bullet extends GameObject {
    color:string;
    private _subscribers:((bulletEvent:BulletEvent,Bullet?:Bullet) => void)[];
    private bulletRadius:number;

    constructor(gameObjectDependencies){
        super(gameObjectDependencies);
        this._subscribers = [];
    }

    public subscribe(subscription: (bulletEvent:BulletEvent,Bullet?:Bullet) => void){
        this._subscribers.push(subscription);
    }
    private notify(event: BulletEvent){
        for(const subscirber of this._subscribers){
            subscirber(event,this);
        }
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
            this.notify(BulletEvent.WALL_HIT);
        }
        this.draw(context,this.physicsController.locationInfo);
    }

    public draw(context:CanvasRenderingContext2D,locationInfo:LocationInfo){
        this.shape.draw(context,locationInfo);
    }
}