import { GameObject } from "../GameObject";
import { Drawable } from "../drawable";
import { Vector } from "../vector";
import { Asteroid } from "./asteroid";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { PhysicsController } from "../physics/physics-controller";

export class NormalAsteroid extends GameObject implements Asteroid{
    public color:string;
    public shape:Drawable;
    constructor(color:string,
            shape:Drawable,
            rollDrag:number,
            velocity:Vector,
            locationInfo:LocationInfo,
            size:number){
        super();
        this.physicsController = new PhysicsController();
        this.physicsController.rollDrag = rollDrag;
        this.physicsController.velocity = velocity;
        this.physicsController.locationInfo = locationInfo;
        this.size = size;
    }


    explode(){

    }
}
