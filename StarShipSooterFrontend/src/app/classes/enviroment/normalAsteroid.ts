import { GameObject, GameObjectDependencies } from "../GameObject";
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
            gameObjectDependencies:GameObjectDependencies,
            size:number){
        super(gameObjectDependencies);
        this.physicsController.rollDrag = rollDrag;
        this.physicsController.velocity = velocity;
        this.size = size;
    }


    explode(){

    }
    nextStep(){
        
    }
}
