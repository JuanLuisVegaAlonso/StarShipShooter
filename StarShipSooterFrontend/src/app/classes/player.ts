import { Bullet } from "./bullet";
import { GameObject } from "./GameObject";
import { Drawable } from "./drawable";
import { PlayerShape } from "./playerShape";
import { frameRate } from "../constants/gameConfig";
import { Point } from "./point";

export class Player extends GameObject {
    id:number;
    forwardThrottle: number;
    backwardThrottle: number;
    torque: number;
    dragForce: number[] = [0, 0];
    rollingForce: number[] = [0, 0];
    engineForce: number[] = [0, 0];
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

    constructor(id:number){
        super();
        this.id =id;
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
        this.rotation += this.rotationSpeed;
        super.nextStep();
        for(let bullet of this.ownBullets){
            bullet.nextStep();
        }
        this.draw();
        this.resetEngineForce();
        this.resetTurning();
    }
    public draw() {
        this.shape.draw(this.position, this.rotation);
    }

    private resetEngineForce() {
        this.engineForce = [0, 0];
    }
    private resetTurning() {
        this.externalTorque = 0;
    }
    public changeRotation(clockWise: boolean) {
        this.externalTorque = this.torque;
        this.clockwise = clockWise;
    }

    public forward() {
        this.engineForce[0] = Math.sin(this.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
        this.engineForce[1] = Math.cos(this.rotation - Math.PI * 3 / 4) * this.forwardThrottle;
    }
    public backward() {
        this.engineForce[0] = -Math.sin(this.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
        this.engineForce[1] = -Math.cos(this.rotation - Math.PI * 3 / 4) * this.backwardThrottle;
    }


    private calculateDragForce() {
        this.dragForce[0] = -this.drag * Math.pow(this.velocity.x, 2) * Math.sign(this.velocity.x);
        this.dragForce[1] = -this.drag * Math.pow(this.velocity.y, 2) * Math.sign(this.velocity.y);
    }

    private calculateRollingForce() {
        this.rollingForce[0] = -this.rollDrag * this.velocity.x;
        this.rollingForce[1] = -this.rollDrag * this.velocity.y;
    }

    private calculateAcceleration() {
        let fx = this.engineForce[0] + this.dragForce[0] + this.rollingForce[0];
        let fy = this.engineForce[1] + this.dragForce[1] + + this.rollingForce[1];
        this.acceleration.x = fx / this.mass;
        this.acceleration.y = fy / this.mass;
    }

    private calculateSpeed() {
        this.velocity.x = this.velocity.x + this.acceleration.x * frameRate;
        this.velocity.y = this.velocity.y + this.acceleration.y * frameRate;
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
        if (this.ownBullets.length < this.maxBullets) {
            let bullet = new Bullet();
            bullet.owner = this;
            bullet.rotation = this.rotation - 3 * Math.PI / 4;
            bullet.position = new Point(this.position.x,this.position.y);
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