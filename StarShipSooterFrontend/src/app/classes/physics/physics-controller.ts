import { Vector } from "../vector";
import { frameRate } from "../../constants/gameConfig";
import { LocationInfo } from "../locationInfo";

export class PhysicsController {

    // From gameObject.ts
    velocity:Vector = new Vector(0,0);
    acceleration:Vector = new Vector(0,0);
    mass = 10;
    drag:number = 0;
    rollDrag:number=0.1;

    // From Player.ts
    locationInfo = new LocationInfo();
    forwardThrottle: number = 0;
    backwardThrottle: number = 0;
    torque: number = 0;
    dragForce: Vector = new Vector(0, 0);
    rollingForce: Vector = new Vector(0, 0);
    engineForce: Vector = new Vector(0, 0);
    rotationSpeed: number = 0;
    rotationAcceleration: number = 0;
    clockwise: boolean;
    externalTorque: number = 0;
    rotationDrag:number = 0.1;
    rotationRollingDrag: number = 0.3;
    rotationDragForce:number = 0;
    rotationRollingDragForce:number = 0;

    constructor(locationInfo:LocationInfo){
        this.locationInfo = locationInfo;
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
    public resetEngineForce() {
        this.engineForce = new Vector(0, 0);
    }
    public resetTurning() {
        this.externalTorque = 0;
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
    

    public nextLocationInfo(): LocationInfo{
        this.calculateDragForce();
        this.calculateRollingForce();
        this.calculateAcceleration();
        this.calculateSpeed();
        this.calculateRotationDrag();
        this.calculateRotationRollingDrag()
        this.calculateRotationAcceleration();
        this.calculateRotationSpeed();
        this.locationInfo.rotation += this.rotationSpeed;
        this.locationInfo.position.move(this.velocity);        
        return this.locationInfo;
    }
    public changeRotation(clockWise: boolean) {
        this.externalTorque = this.torque;
        this.clockwise = clockWise;
    }
}