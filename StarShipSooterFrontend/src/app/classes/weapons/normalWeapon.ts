import { Weapon } from "./weapon";
import { GameObject, GameObjectDependencies } from "../GameObject";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { Bullet } from "./bullets/bullet";
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

            // TODO somehow subscribe to the wall collision event
            let bullet = this._bulletFactory.createBullet((bullet)=> this.deleteBullet(bullet));
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

    private deleteBullet(bullet: Bullet){
        const bulletPosition = this.ownBullets.indexOf(bullet);
        if(bulletPosition !== -1 ){
            this.ownBullets.splice(bulletPosition,1);
        }
    }
}