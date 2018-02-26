import { GameObject } from "./GameObject";
import { Player } from "./player";

export class Bullet implements GameObject {
    x:number;
    y:number;
    size:number;
    vx:number;
    vy:number;
    rotation:number;
    shape: Path2D;
    color:string;
    bulletRadius:number;
    owner:Player;

    public setSpeed(speed:number){
        this.vx = Math.sin(this.rotation )*speed;
        this.vy =  Math.cos(this.rotation )*speed;
    }


    public nextStep(){
        this.shape = new Path2D();
        this.x += this.vx;
        this.y += this.vy;
        this.shape.moveTo(this.x,this.y);
        this.shape = new Path2D();
        this.shape.arc(this.x, this.y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
    }
}