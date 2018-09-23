import { GameInstance } from "../../gameInstance";
import { Bullet, BulletEvent } from "./bullet";
import { GameObject } from "../../GameObject";

export class BulletFactory{
    private _world: GameInstance;
    private _onWallColission: (bulletEvent:BulletEvent, bullet:Bullet)  => void
    constructor(world:GameInstance,onWallColission: (bulletEvent:BulletEvent, bullet:Bullet) => void){
        this._world = world;
        this._onWallColission = onWallColission;
        console.dir(this._onWallColission);
    }

    public createBullet(onWallColission: (bullet) => void){
        const bullet = new Bullet(GameObject.initGameObject());
        this._world.addGameObject(bullet);
        return bullet;
    }
}