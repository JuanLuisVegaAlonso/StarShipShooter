import { Drawable } from "./drawable";
import { Point } from "./point";
import { LocationInfo } from "./locationInfo";

export class PlayerShape implements Drawable{
    shape:Path2D;
    size:number;
    color:string;
    constructor(size:number,color='red'){
        this.size = size;
        this.color = color;
    }
    public draw(ctx: CanvasRenderingContext2D,locationInfo:LocationInfo){
        this.shape = new Path2D();
        this.shape.moveTo(locationInfo.position.x,locationInfo.position.y);
        this.nextFirstPoint(locationInfo.position.x,locationInfo.position.y,locationInfo.rotation);
        this.nextSecondPoint(locationInfo.position.x,locationInfo.position.y,locationInfo.rotation);
        this.shape.lineTo(locationInfo.position.x,locationInfo.position.y);
        let hue = this.calculateHue(locationInfo.position.x,locationInfo.position.y,locationInfo.rotation);
        let color = 'rgb('+hue[0]+','+hue[1]+','+hue[2]+')';
        this.color = color;
        ctx.fillStyle = this.color;
        ctx.fill(this.shape);
    }

    private nextFirstPoint(currentX:number,currentY:number,rotation:number) {
        let x = currentX + Math.sin(rotation) * this.size;
        let y = currentY + Math.cos(rotation) * this.size;
        this.shape.lineTo(x, y);
    }
    private nextSecondPoint(currentX:number,currentY:number,rotation:number) {
        let x =  currentX + Math.sin(rotation + Math.PI / 2) * this.size;
        let y =  currentY + Math.cos(rotation + Math.PI / 2) * this.size;
        this.shape.lineTo(x, y);
    }
    private calculateHue(x:number,y:number,rotation:number):number[]{
        let hue = [];
        hue[0] = Math.round(Math.abs(x / 2 % 255));
        hue[1] = Math.round(Math.abs(y / 2 % 255));
        hue[2] = Math.round(Math.abs(((rotation % (2*Math.PI)) / (Math.PI*2)) *255  ));
        return hue;
    }
}