import { GameObject } from "./GameObject";
import { Drawable } from "./drawable";
import { PlayerShape } from "./playerShape";
import { frameRate } from "../constants/gameConfig";
import { Point } from "./point";
import { Vector } from "./vector";
import { Weapon } from "./weapons/weapon";
import { WeaponFactory } from "./weapons/weaponFactory";
import { Bullet } from "./weapons/bullets/bullet";
import { LocationInfo } from "./locationInfo";

export class Player extends GameObject {
    id:number;
    forwardThrottle: number;
    backwardThrottle: number;
    torque: number;
    dragForce: Vector = new Vector(0, 0);
    rollingForce: Vector = new Vector(0, 0);
    engineForce: Vector = new Vector(0, 0);
    bulletSpeed = 10;
    bulletRadius = 2;
    bulletColor = 'red';
    maxBullets = 10;
    ownBullets: Bullet[] = [];
    rotationSpeed: number = 0;
    rotationAcceleration: number = 0;
    clockwise: boolean;
    externalTorque: number = 0;
    rotationDrag:number = 0.1;
    rotationRollingDrag: number = 0.3;
    rotationDragForce:number;
    rotationRollingDragForce:number;
    weapon:Weapon;
    constructor(id:number){
        super();
        this.locationInfo = new LocationInfo();
        this.id =id;
        this.weapon = WeaponFactory.createWeapon(this.locationInfo);
    }
    public initShape() {
        if (this.size && this.color) {
            this.shape = new PlayerShape(this.size, this.color);
        }
        else if (this.size) {
            this.shape = new PlayerShape(this.size);
        }
        else {
            throw Error("Size is not defined");
        }
    }
    public nextStep() {
        this.calculateDragForce();
        this.calculateRollingForce();
        this.calculateAcceleration();
        this.calculateSpeed();
        this.calculateRotationDrag();
        this.calculateRotationRollingDrag()
        this.calculateRotationAcceleration();
        this.calculateRotationSpeed();
        this.locationInfo.rotation += this.rotationSpeed;
        super.nextStep();
        for(let bullet of this.ownBullets){
            bullet.nextStep();
        }
        this.draw();
        this.resetEngineForce();
        this.resetTurning();
    }
    public draw() {
        this.shape.draw(this.locationInfo.position, this.locationInfo.rotation);
    }

    private resetEngineForce() {
        this.engineForce = new Vector(0, 0);
    }
    private resetTurning() {
        this.externalTorque = 0;
    }
    public changeRotation(clockWise: boolean) {
        this.externalTorque = this.torque;
        this.clockwise = clockWise;
    }

    public forward() {
        const forceX = Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        const forceY = Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        this.engineForce.changeDirection(forceX,forceY);
    }
    public backward() {
        const forceX = -Math.sin(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        const forceY = -Math.cos(this.locationInfo.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        this.engineForce.changeDirection(forceX,forceY);
    }

    private calculateDragForce() {
        let forceDirection = this.velocity
                                .getNormalized()
                                .escalarMultiply(Math.pow(this.velocity.getModule(),2))
                                .escalarMultiply(-this.drag);
        this.dragForce.changeDirection(forceDirection.x,forceDirection.y);
    }

    private calculateRollingForce() {
        this.rollingForce.escalarMultiply(-this.rollDrag);
    }

    private calculateAcceleration() {
        this.acceleration.changeDirection(0,0);
        this.acceleration
            .add(this.engineForce)
            .add(this.dragForce)
            .add(this.rollingForce)
            .escalarDivide(this.mass);
    }

    private calculateSpeed() {
        this.velocity.add(this.acceleration.escalarMultiply(frameRate))
    }
    private calculateRotationAcceleration() {
        let rotationForce = (this.externalTorque * (this.clockwise ? 1 : -1) ) +  this.rotationDragForce + this.rotationRollingDragForce;
        this.rotationAcceleration = rotationForce /this.mass;
    }
    private calculateRotationSpeed() {
        this.rotationSpeed = this.rotationSpeed + this.rotationAcceleration * frameRate;
    }
    private calculateRotationDrag(){
        this.rotationDragForce = -this.rotationDrag* Math.pow(this.rotationSpeed,2) * Math.sign(this.rotationSpeed);
    }
    private calculateRotationRollingDrag(){
        this.rotationRollingDragForce = -this.rotationRollingDrag * this.rotationSpeed;
    }
    private showCurrentInfo(message: string) {
        console.log(message + ' vx: ' + this.velocity.x + "  vy: " + this.velocity.y);
    }

    public shoot(): boolean {
        // return this.weapon.shoot();
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