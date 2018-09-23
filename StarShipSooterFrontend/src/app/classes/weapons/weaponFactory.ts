import { Weapon } from "./weapon";
import { NormalWeapon } from "./normalWeapon";
import { Point } from "../point";
import { LocationInfo } from "../locationInfo";
import { GameObjectDependencies, GameObject } from "../GameObject";
import { GameInstance } from "../gameInstance";
import { BulletFactory } from "./bullets/bulletFactory";

export class WeaponFactory{
    private _world: GameInstance;
    private _bulletFactory: BulletFactory;
    constructor(world:GameInstance, bulletFactory: BulletFactory){
        this._world =  world;
        this._bulletFactory = bulletFactory;
    }
    createWeapon(): Weapon{
        const weapon = new NormalWeapon(GameObject.initGameObject(),this._bulletFactory);
        this._world.addGameObject(weapon);
        return weapon;
    }
}