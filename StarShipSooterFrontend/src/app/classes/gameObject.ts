import { Drawable } from "./drawable";

export class GameObject{
    x:number;
    y:number;
    size:number;
    vx:number;
    vy:number;
    mass:number;
    ax:number;
    ay:number;
    rotation:number;
    drag:number;
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