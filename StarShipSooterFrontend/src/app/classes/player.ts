import { Bullet } from "./bullet";
import { GameObject } from "./GameObject";

export class Player implements GameObject {
    x:number;
    y:number;
    size:number;
    vx:number;
    vy:number;
    rotation:number;
    shape: Path2D;
    color:string;
    drag:number;

    bulletSpeed = 10;
    bulletRadius = 2;
    bulletColor = 'red';
    maxBullets = 10;
    public nextStep(){
        this.shape = new Path2D();
        this.slowdown();
        this.x += this.vx;
        this.y += this.vy;
        this.shape.moveTo(this.x,this.y);
        this.nextFirstPoint();
        this.nextSecondPoint();
        this.shape.lineTo(this.x,this.y);
        //this.showCurrentInfo();
    }
    private nextFirstPoint(){
        let x = this.x + Math.sin(this.rotation)*this.size;
        let y = this.y + Math.cos(this.rotation)*this.size;
        this.shape.lineTo(x,y);
    }
    private nextSecondPoint(){
        let x = this.x + Math.sin(this.rotation + Math.PI/2)*this.size;
        let y = this.y + Math.cos(this.rotation + Math.PI/2)*this.size;  
        this.shape.lineTo(x,y);
    }
    
    private slowdown(){
        if (Math.abs(this.vx) > 1){
            this.vx = this.vx - Math.pow(this.vx,2) * (this.vx/Math.abs(this.vx)) * this.drag;
        }
        else  {
            this.vx = this.vx - this.vx * this.drag;
        }
        if(Math.abs(this.vy) > 1){
            this.vy = this.vy - Math.pow(this.vy,2) * (this.vy/Math.abs(this.vy)) * this.drag;
        }
        else  {
            this.vy = this.vy - this.vy * this.drag;
        }
        
    }
    
    public changeRotation(rotation:number){
        this.rotation = this.rotation + rotation;
    }

    public forward(thrust:number){
        this.vx= this.vx +  Math.sin(this.rotation - 3*Math.PI/4)*thrust;
        this.vy = this.vy +  Math.cos(this.rotation - 3*Math.PI/4)*thrust;
    }


    private showCurrentInfo(){
        console.log('vx: ' + this.vx + "  vy: " + this.vy);
    }

    public shoot():Bullet{
        let bullet = new Bullet();
        bullet.owner =  this;
        bullet.rotation = this.rotation - 3*Math.PI/4;
        bullet.x = this.x;
        bullet.y = this.y;
        bullet.color = this.bulletColor;
        bullet.setSpeed(this.bulletSpeed);
        bullet.bulletRadius = this.bulletRadius;
        return bullet;
    }
}