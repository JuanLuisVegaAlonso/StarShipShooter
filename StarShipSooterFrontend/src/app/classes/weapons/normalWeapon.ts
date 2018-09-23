import { Weapon } from "./weapon";
import { GameObject, GameObjectDependencies } from "../GameObject";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { Bullet, BulletEvent } from "./bullets/bullet";
import { BulletFactory } from "./bullets/bulletFactory";

export class NormalWeapon extends Weapon{
    constructor(gameObjectDependencies:GameObjectDependencies, bulletFactory:BulletFactory){
        super(gameObjectDependencies,bulletFactory);
        this.getBulletRadius = () =>  {
            return Math.random()*20;
        }
        this.maxBullets = 1000;
    }
    shoot(locationInfo:LocationInfo):boolean{
        if (this.ownBullets.length < this.maxBullets && this.canShoot() ) {
            let bullet = this._bulletFactory.createBullet((bullet)=> this.deleteBullet(bullet));
            bullet.subscribe((bulletEvent,bullet) => this.bulletListener(bulletEvent,bullet));
            bullet.physicsController.locationInfo.rotation = locationInfo.rotation - 3 * Math.PI / 4;
            bullet.physicsController.locationInfo.position =  new Point(locationInfo.position.x,locationInfo.position.y);
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.getBulletRadius);
            this.ownBullets.push(bullet);
            this.lastShootedAt = Date.now();
            return true;
        }
        return false;
    }

    private bulletListener(bulletEvent: BulletEvent, bullet:Bullet){
        switch(bulletEvent){
            case BulletEvent.WALL_HIT:
                this.deleteBullet(bullet);
            break;
        }
    }
    private deleteBullet(bullet: Bullet){
        const bulletPosition = this.ownBullets.indexOf(bullet);
        if(bulletPosition !== -1 ){
            this.ownBullets.splice(bulletPosition,1);
        }
    }
}