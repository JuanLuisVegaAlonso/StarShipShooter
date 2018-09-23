import { Point } from "../point";
import { GameObject, GameObjectDependencies } from "../GameObject";
import { Bullet } from "./bullets/bullet";
import { LocationInfo } from "../locationInfo";
import { BulletFactory } from "./bullets/bulletFactory";

export abstract class Weapon extends GameObject{
    bulletSpeed:number;
    getBulletRadius:()=>number;
    bulletColor:string;
    maxBullets:number
    ownBullets: Bullet[];
    fireRate:number;
    protected lastShootedAt:number;
    protected _bulletFactory: BulletFactory;

    constructor(gameObjectDependencies:GameObjectDependencies,bulletFactory:BulletFactory){
        super(gameObjectDependencies);
        this.bulletColor = 'red';
        this.bulletSpeed = 10;
        this.maxBullets = 10;
        this.getBulletRadius = () =>  2;
        this.ownBullets = [];
        this.fireRate = 100;
        this._bulletFactory = bulletFactory;
    }
    abstract shoot(locationInfo:LocationInfo):boolean;

    canShoot(){
        const maxBulletLimitReached = this.ownBullets.length >= this.maxBullets;
        return !maxBulletLimitReached && !this.fireRateLimitReached();
    }
    fireRateLimitReached():boolean{
        let limitReached =  false;
        if(this.lastShootedAt !== undefined){
            const timeBeteweenShots = 1/this.fireRate * 1000;
            if(timeBeteweenShots > Date.now() - this.lastShootedAt){
                limitReached = true;
            }
        }
        return limitReached;
    }
    nextStep(context:CanvasRenderingContext2D){
        for(let bullet of this.ownBullets){
            bullet.nextStep(context);
        }
    }
}