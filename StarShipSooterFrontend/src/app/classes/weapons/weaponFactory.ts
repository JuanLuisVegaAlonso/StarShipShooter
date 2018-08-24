import { Weapon } from "./weapon";
import { NormalWeapon } from "./normalWeapon";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";

export class WeaponFactory{
    static createWeapon(position:LocationInfo): Weapon{
        return new NormalWeapon(position);
    }
}