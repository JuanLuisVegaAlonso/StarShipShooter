import { Drawable } from "./drawable";
import { Point } from "./point";

export class BulletShape implements Drawable {
    shape: Path2D;
    bulletRadius:number;
    color:string;
    ctx: CanvasRenderingContext2D;
    constructor(bulletRadius:number,color = 'red'){
        this.bulletRadius = bulletRadius;
        this.color = color;
    }
    initContext(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
    }

    draw(position: Point){
        this.shape = new Path2D();
        this.shape.moveTo(position.x,position.y);
        this.shape = new Path2D();
        this.shape.arc(position.x, position.y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill(this.shape);
    }
}