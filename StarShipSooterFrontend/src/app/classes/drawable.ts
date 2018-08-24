import { Point } from "./point";
import { LocationInfo } from "./locationInfo";

export interface Drawable{
    shape: Path2D;
    color: string;
    draw(ctx:CanvasRenderingContext2D,position:LocationInfo);
}