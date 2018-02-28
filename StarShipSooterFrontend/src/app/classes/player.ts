import { Bullet } from "./bullet";
import { GameObject } from "./GameObject";
import { Drawable } from "./drawable";
import { PlayerShape } from "./playerShape";

export class Player extends GameObject  {
    forwardThrottle: number;
    backwardThrottle: number;
    torque: number;

    bulletSpeed = 10;
    bulletRadius = 2;
    bulletColor = 'red';
    maxBullets = 10;
    ownBullets: Bullet[] = [];

    public initShape(){
        if(this.size && this.color){
            this.shape = new PlayerShape(this.size,this.color);
        }
        else if(this.size){
            this.shape = new PlayerShape(this.size);
        }
        else{
            throw Error("Size is not defined");
        }
    }
    public nextStep() {
        this.slowdown();
        super.nextStep();
        this.draw();
    }
    public draw(){
        this.shape.draw(this.x,this.y,this.rotation);
    }

    private slowdown() {
        this.vx = this.vx *(1-this.drag);
        this.vy = this.vy *(1-this.drag);
        let v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
        if (v < 1) {
            this.vy = Math.abs(this.vy) > 0.1 ? this.vy : 0;
            this.vx = Math.abs(this.vx) > 0.1 ? this.vx : 0;
        }
    }

    public changeRotation(rotation: number) {
        this.rotation = this.rotation + rotation;
    }

    public forward(thrust: number) {
        this.vx = this.vx + Math.sin(this.rotation - Math.PI * 3 / 4) * thrust;
        this.vy = this.vy + Math.cos(this.rotation - Math.PI * 3 / 4) * thrust;
    }


    private showCurrentInfo(message: string) {
        console.log(message + ' vx: ' + this.vx + "  vy: " + this.vy);
    }

    public shoot(): boolean {
        if (this.ownBullets.length < this.maxBullets) {
            let bullet = new Bullet();
            bullet.owner = this;
            bullet.rotation = this.rotation - 3 * Math.PI / 4;
            bullet.x = this.x;
            bullet.y = this.y;
            bullet.color = this.bulletColor;
            bullet.setSpeed(this.bulletSpeed);
            bullet.setBulletRadius(this.bulletRadius);
            this.ownBullets.push(bullet);
            return true;
        }
        return false;
    }
}