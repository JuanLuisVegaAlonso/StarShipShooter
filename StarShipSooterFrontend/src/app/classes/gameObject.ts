import { Drawable } from "./drawable";
import { Vector } from "./vector";
import { Point } from "./point";
import { LocationInfo } from "./locationInfo";
export class GameObject{
    velocity:Vector;
    acceleration:Vector;
    size:number;
    mass = 10;
    drag:number;
    rollDrag:number=0.1;
    protected shape: Drawable;
    color: string;

    locationInfo:LocationInfo;
    
    constructor(){
        this.locationInfo = new LocationInfo();
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);

    }

    nextStep(context:CanvasRenderingContext2D){
        this.locationInfo.position.move(this.velocity);
    }

    getShape(){
        return this.shape;
    }
}