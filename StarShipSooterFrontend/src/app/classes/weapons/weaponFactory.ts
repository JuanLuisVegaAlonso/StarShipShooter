import { Weapon } from "./weapon";
import { NormalWeapon } from "./normalWeapon";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { GameObjectDependencies } from "../GameObject";
import { GameInstance } from "../gameInstance";
import { BulletFactory } from "./bullets/bulletFactory";

export class WeaponFactory{
    private _world: GameInstance;
    constructor(world:GameInstance){
        this._world =  world;
    }
    createWeapon(gameObjectDependencies:GameObjectDependencies,bulletFactory: BulletFactory): Weapon{
        const weapon = new NormalWeapon(gameObjectDependencies,bulletFactory);
        this._world.addGameObject(weapon);
        return weapon;
    }
}