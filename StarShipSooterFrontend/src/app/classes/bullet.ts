import { GameObject } from "./GameObject";
import { Player } from "./player";
import { Drawable } from "./drawable";
import { BulletShape } from "./bulletShape";
import { Vector } from "./vector";
import { Point } from "./point";

export class Bullet extends GameObject {
    color:string;
    private bulletRadius:number;
    owner:Player;

    public setSpeed(speed:number){
        const vx = Math.sin(this.rotation )*speed;
        const vy =  Math.cos(this.rotation )*speed;
        this.velocity = new Vector(vx,vy);
    }

    public setBulletRadius(bulletRadius:number){
        this.shape = new BulletShape(bulletRadius);
    }

    public nextStep(){
        super.nextStep();
        this.draw();
    }

    public draw(){
        this.shape.draw(this.position);
    }
}