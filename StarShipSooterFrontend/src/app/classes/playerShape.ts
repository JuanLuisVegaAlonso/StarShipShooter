import { Drawable } from "./drawable";
import { Point } from "./point";

export class PlayerShape implements Drawable{
    shape:Path2D;
    size:number;
    color:string;
    ctx: CanvasRenderingContext2D;
    constructor(size:number,color='red'){
        this.size = size;
        this.color = color;
    }
    initContext(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
    }
    public draw(position:Point,rotation:number){
        this.shape = new Path2D();
        this.shape.moveTo(position.x,position.y);
        this.nextFirstPoint(position.x,position.y,rotation);
        this.nextSecondPoint(position.x,position.y,rotation);
        this.shape.lineTo(position.x,position.y);
        let hue = this.calculateHue(position.x,position.y,rotation);
        let color = 'rgb('+hue[0]+','+hue[1]+','+hue[2]+')';
        this.color = color;
        this.ctx.fillStyle = this.color;
        this.ctx.fill(this.shape);
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