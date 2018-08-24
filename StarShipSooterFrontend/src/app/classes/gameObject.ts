import { Drawable } from "./drawable";
import { Vector } from "./vector";
import { Point } from "./point";
export class GameObject{
    position: Point;
    velocity:Vector;
    acceleration:Vector;
    size:number;
    mass = 10;
    rotation:number;
    drag:number;
    rollDrag:number=0.1;
    protected shape: Drawable;
    color: string;

    constructor(){
        this.position = new Point(0,0);
        this.velocity = new Vector(0,0);
        this.acceleration = new Vector(0,0);
        
    }

    nextStep(){
        this.position.move(this.velocity);
    }

    getShape(){
        return this.shape;
    }
}