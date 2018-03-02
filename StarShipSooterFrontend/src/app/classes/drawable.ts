export interface Drawable{
    shape: Path2D;
    color: string;
    ctx: CanvasRenderingContext2D;
    draw(x:number, y:number,rotation?:number);
    initContext(ctx: CanvasRenderingContext2D);
}