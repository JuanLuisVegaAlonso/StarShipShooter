import { Weapon } from "./weapon";
import { GameObject } from "../GameObject";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { Bullet } from "./bullets/bullet";

export class NormalWeapon extends Weapon{
    constructor(position:LocationInfo){
        super(position);
    }
    shoot():boolean{
        if (this.ownBullets.length < this.maxBullets) {
            let bullet = new Bullet();
            bullet.owner = this;
            bullet.locationInfo.rotation = this.locationInfo.rotation - 3 * Math.PI / 4;
            bullet.locationInfo.position.x =  this.locationInfo.position.x;
            bullet.locationInfo.position.y = this.locationInfo.position.y
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.bulletRadius);
            this.ownBullets.push(bullet);
            bullet.getShape().initContext(this.getShape().ctx);
            return true;
        }
        return false;
    }
}