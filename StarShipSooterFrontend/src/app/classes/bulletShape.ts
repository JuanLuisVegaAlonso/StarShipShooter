import { Drawable } from "./drawable";

export class BulletShape implements Drawable {
    shape: Path2D;
    bulletRadius:number;
    color:string;
    constructor(bulletRadius:number,color = 'red'){
        this.bulletRadius = bulletRadius;
        this.color = color;
    }

    draw(x:number,y:number){
        this.shape = new Path2D();
        this.shape.moveTo(x,y);
        this.shape = new Path2D();
        this.shape.arc(x, y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
    }
}