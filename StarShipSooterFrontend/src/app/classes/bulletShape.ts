import { Drawable } from "./drawable";
import { Point } from "./point";
import { LocationInfo } from "./locationInfo";

export class BulletShape implements Drawable {
    shape: Path2D;
    bulletRadius:number;
    color:string;
    constructor(bulletRadius:number,color = 'red'){
        this.bulletRadius = bulletRadius;
        this.color = color;
    }

    draw(ctx:CanvasRenderingContext2D,locationInfo: LocationInfo){
        this.shape = new Path2D();
        this.shape.moveTo(locationInfo.position.x,locationInfo.position.y);
        this.shape = new Path2D();
        this.shape.arc(locationInfo.position.x, locationInfo.position.y, this.bulletRadius, 0, Math.PI * 2, true);
        this.shape.closePath();
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    }
}