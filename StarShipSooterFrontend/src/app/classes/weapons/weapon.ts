import { Point } from "../point";
import { GameObject } from "../GameObject";
import { Bullet } from "./bullets/bullet";
import { LocationInfo } from "../locationInfo";

export abstract class Weapon extends GameObject{
    bulletSpeed = 10;
    bulletRadius = 2;
    bulletColor = 'red';
    maxBullets = 10;
    ownBullets: Bullet[] = [];
    constructor(position:LocationInfo){
        super();
    }
    abstract shoot():boolean;
}