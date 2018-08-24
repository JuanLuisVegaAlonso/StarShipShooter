import { GameObject } from "../../GameObject";
import { Player } from "../../player";
import { Vector } from "../../vector";
import { Weapon } from "../weapon";
import { BulletShape } from "./bulletShape";


export class Bullet extends GameObject {
    color:string;
    private bulletRadius:number;

    public setSpeed(speed:number){
        const vx = Math.sin(this.locationInfo.rotation )*speed;
        const vy =  Math.cos(this.locationInfo.rotation )*speed;
        this.velocity = new Vector(vx,vy);
    }

    public setBulletRadius(bulletRadius:number){
        this.shape = new BulletShape(bulletRadius);
    }

    public nextStep(context:CanvasRenderingContext2D){
        super.nextStep(context);
        this.draw(context);
    }

    public draw(context:CanvasRenderingContext2D){
        this.shape.draw(context,this.locationInfo);
    }
}