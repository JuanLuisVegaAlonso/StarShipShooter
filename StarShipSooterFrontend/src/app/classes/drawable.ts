export interface Drawable{
    shape: Path2D;
    color: string;
    draw(x:number, y:number,rotation?:number);
}