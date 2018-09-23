import { Weapon } from "./weapon";
import { NormalWeapon } from "./normalWeapon";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { GameObjectDependencies } from "../GameObject";

export class WeaponFactory{
    static createWeapon(gameObjectDependencies:GameObjectDependencies): Weapon{
        return new NormalWeapon(gameObjectDependencies);
    }
}