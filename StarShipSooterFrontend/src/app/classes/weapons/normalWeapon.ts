import { Weapon } from "./weapon";
import { GameObject } from "../GameObject";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { Bullet } from "./bullets/bullet";

export class NormalWeapon extends Weapon{
    constructor(position:LocationInfo){
        super(position);
    }
    shoot(locationInfo:LocationInfo):boolean{
        if (this.ownBullets.length < this.maxBullets) {
            let bullet = new Bullet();
            bullet.locationInfo.rotation = locationInfo.rotation - 3 * Math.PI / 4;
            bullet.locationInfo.position.x =  locationInfo.position.x;
            bullet.locationInfo.position.y = locationInfo.position.y;
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.bulletRadius);
            this.ownBullets.push(bullet);
            return true;
        }
        return false;
    }
}