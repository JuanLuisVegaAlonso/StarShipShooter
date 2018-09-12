import { Weapon } from "./weapon";
import { GameObject } from "../GameObject";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { Bullet } from "./bullets/bullet";

export class NormalWeapon extends Weapon{
    constructor(position:LocationInfo){
        super(position);
        this.getBulletRadius = () =>  {
            return Math.random()*20;
        }
        this.maxBullets = 1000;
    }
    shoot(locationInfo:LocationInfo):boolean{
        if (this.ownBullets.length < this.maxBullets && this.canShoot() ) {
            let bullet = new Bullet();
            bullet.physicsController.locationInfo.rotation = locationInfo.rotation - 3 * Math.PI / 4;
            bullet.physicsController.locationInfo.position.x =  locationInfo.position.x;
            bullet.physicsController.locationInfo.position.y = locationInfo.position.y;
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.getBulletRadius);
            this.ownBullets.push(bullet);
            this.lastShootedAt = Date.now();
            return true;
        }
        return false;
    }
}