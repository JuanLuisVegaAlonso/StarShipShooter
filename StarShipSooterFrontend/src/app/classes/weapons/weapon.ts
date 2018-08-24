import { Point } from "../point";
import { GameObject } from "../GameObject";
import { Bullet } from "./bullets/bullet";
import { LocationInfo } from "../locationInfo";

export abstract class Weapon extends GameObject{
    bulletSpeed:number;
    bulletRadius:number;
    bulletColor:string;
    maxBullets:number
    ownBullets: Bullet[];
    constructor(position:LocationInfo){
        super();
        this.bulletColor = 'red';
        this.bulletSpeed = 10;
        this.maxBullets = 10;
        this.bulletRadius = 2;
        this.ownBullets = [];
    }
    abstract shoot(locationInfo:LocationInfo):boolean;

    nextStep(context:CanvasRenderingContext2D){
        for(let bullet of this.ownBullets){
            bullet.nextStep(context);
        }
    }
}