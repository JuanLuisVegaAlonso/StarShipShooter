import { Drawable } from "./drawable";

export class GameObject{
    x:number;
    y:number;
    size:number;
    vx:number;
    vy:number;
    mass = 10;
    ax:number;
    ay:number;
    rotation:number;
    drag:number;
    rollDrag:number=0.1;
    protected shape: Drawable;
    color: string;

    nextStep(){
        this.x = this.x +this.vx;
        this.y = this.y + this.vy;
    }
    getShape(){
        return this.shape;
    }
}