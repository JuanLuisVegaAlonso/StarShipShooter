import { GameObject } from "../GameObject";
import { Drawable } from "../drawable";
import { Vector } from "../vector";
import { Asteroid } from "./asteroid";
import { Point } from "../point";

export class NormalAsteroid extends GameObject implements Asteroid{
    public color:string;
    public shape:Drawable;
    public rotation:number;
    constructor(color:string,
            shape:Drawable,
            rotation:number,
            rollDrag:number,
            velocity:Vector,
            position:Point,
            size:number){
        super();
        this.color  = color;
        this.shape = shape;
        this.rotation = rotation;
        this.rollDrag = rollDrag;
        this.velocity = velocity
        this.position = position;
        this.size = size;
    }


    explode(){

    }
}
