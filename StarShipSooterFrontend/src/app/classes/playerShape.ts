import { Drawable } from "./drawable";

export class PlayerShape implements Drawable{
    shape:Path2D;
    size:number;
    color:string;
    constructor(size:number,color='red'){
        this.size = size;
        this.color = color;
    }
    public draw(x:number, y:number,rotation:number){
        this.shape = new Path2D();
        this.shape.moveTo(x, y);
        this.nextFirstPoint(x,y,rotation);
        this.nextSecondPoint(x,y,rotation);
        this.shape.lineTo(x,y);
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
}