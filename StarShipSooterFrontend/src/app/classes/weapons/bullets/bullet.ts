import { GameObject } from "../../GameObject";
import { Player } from "../../player";
import { Vector } from "../../vector";
import { BulletShape } from "../../bulletShape";
import { Weapon } from "../weapon";


export class Bullet extends GameObject {
    color:string;
    private bulletRadius:number;
    owner:Weapon;

    public setSpeed(speed:number){
        const vx = Math.sin(this.locationInfo.rotation )*speed;
        const vy =  Math.cos(this.locationInfo.rotation )*speed;
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
        this.shape.draw(this.locationInfo.position);
    }
}