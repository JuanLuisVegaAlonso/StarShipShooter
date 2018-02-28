import { GameObject } from "./GameObject";
import { Player } from "./player";
import { Drawable } from "./drawable";
import { BulletShape } from "./bulletShape";

export class Bullet extends GameObject {
    color:string;
    private bulletRadius:number;
    owner:Player;

    public setSpeed(speed:number){
        this.vx = Math.sin(this.rotation )*speed;
        this.vy =  Math.cos(this.rotation )*speed;
    }

    public setBulletRadius(bulletRadius:number){
        this.shape = new BulletShape(bulletRadius);
    }

    public nextStep(){
        super.nextStep();
        this.draw();
    }

    public draw(){
        this.shape.draw(this.x,this.y);
    }
}