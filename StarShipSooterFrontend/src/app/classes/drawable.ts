import { Point } from "./point";

export interface Drawable{
    shape: Path2D;
    color: string;
    ctx: CanvasRenderingContext2D;
    draw(position:Point,rotation?:number);
    initContext(ctx: CanvasRenderingContext2D);
}