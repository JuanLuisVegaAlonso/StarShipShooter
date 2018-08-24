import { GameObject } from "../GameObject";
import { Drawable } from "../drawable";
import { Vector } from "../vector";
import { Asteroid } from "./asteroid";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";

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
        this.color  = color;
        this.shape = shape;
        this.rollDrag = rollDrag;
        this.velocity = velocity
        this.locationInfo = locationInfo;
        this.size = size;
    }


    explode(){

    }
}
