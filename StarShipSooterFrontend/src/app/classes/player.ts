import { Bullet } from "./bullet";
import { GameObject } from "./GameObject";

export class Player implements GameObject {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    rotation: number;
    shape: Path2D;
    color: string;
    drag: number;
    forwardThrottle: number;
    backwardThrottle: number;
    torque: number;

    bulletSpeed = 10;
    bulletRadius = 2;
    bulletColor = 'red';
    maxBullets = 10;
    ownBullets: Bullet[] = [];
    public nextStep() {
        this.shape = new Path2D();
        this.slowdown();
        this.x += this.vx;
        this.y += this.vy;
        this.shape.moveTo(this.x, this.y);
        this.nextFirstPoint();
        this.nextSecondPoint();
        this.shape.lineTo(this.x, this.y);
        //this.showCurrentInfo();
    }
    private nextFirstPoint() {
        let x = this.x + Math.sin(this.rotation) * this.size;
        let y = this.y + Math.cos(this.rotation) * this.size;
        this.shape.lineTo(x, y);
    }
    private nextSecondPoint() {
        let x = this.x + Math.sin(this.rotation + Math.PI / 2) * this.size;
        let y = this.y + Math.cos(this.rotation + Math.PI / 2) * this.size;
        this.shape.lineTo(x, y);
    }

    private slowdown() {
        /*this.vx = this.vx - (Math.pow(Math.abs(this.vx) > 1? this.vx: 1,2) ) * Math.sign(this.vx) * this.drag;
        
        this.vy = this.vy - (Math.pow(Math.abs(this.vy) > 1? this.vy: 1,2) )* Math.sign(this.vy)  * this.drag;
        let v = Math.sqrt(Math.pow(this.vx,2)+Math.pow(this.vy,2));
        if(v < 1){
            this.vy = Math.abs(this.vy) > 0.1 ? this.vy : 0;
            this.vx = Math.abs(this.vx) > 0.1 ? this.vx : 0;
        }//*/

        this.vx = this.vx *(1-this.drag);
        this.vy = this.vy *(1-this.drag);
        let v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
        if (v < 1) {
            this.vy = Math.abs(this.vy) > 0.1 ? this.vy : 0;
            this.vx = Math.abs(this.vx) > 0.1 ? this.vx : 0;
        }
        //*/
        /*
                let v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
                let vRotation
                if ( v != 0) {
                    vRotation = Math.asin(this.vx /v );
                }
                if (v >= 1) {
                    v = v - Math.pow(v, 2) * this.drag;
                }
                else {
                    v = Math.floor((v - v * this.drag) / 100) * 100;
                    console.log(vRotation);
                }
                let dRotation = vRotation;
                this.vx = v * Math.cos(dRotation || 1) * Math.sign(this.vx);
                this.vy = v * Math.sin(dRotation || 1) * Math.sign(this.vy);//*/
        //this.showCurrentInfo("Slowdown:")
        /*
                let v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2))
                if (v > 1){
                    this.vx = this.vx - Math.pow(this.vx,2) * (this.vx/Math.abs(this.vx||1)) * this.drag;
                    this.vy = this.vy - Math.pow(this.vy,2) * (this.vy/Math.abs(this.vy||1)) * this.drag;
                }
                else  {
                    this.vx = Math.floor((this.vx - this.vx * this.drag)/100)*100;
                    this.vy = Math.floor((this.vy - this.vy * this.drag)/100)*100;
                }//*/
    }

    public changeRotation(rotation: number) {
        this.rotation = this.rotation + rotation;
    }

    public forward(thrust: number) {
        /*let v = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
        v = v + thrust;
        this.vx = Math.cos(this.rotation + 3 * Math.PI / 4) * v;
        this.vy = Math.sin(this.rotation + 3 * Math.PI / 4) * v;//*/
        this.vx = this.vx + Math.sin(this.rotation - Math.PI * 3 / 4) * thrust;
        this.vy = this.vy + Math.cos(this.rotation - Math.PI * 3 / 4) * thrust;//*/
        /*this.vx += 10;
        this.vy += -10;//*/
        //this.showCurrentInfo("forward:");
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
            bullet.bulletRadius = this.bulletRadius;
            this.ownBullets.push(bullet);
            return true;
        }
        return false;
    }
}