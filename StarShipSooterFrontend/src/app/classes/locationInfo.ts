import { Point } from "./point";

export class LocationInfo{
    position: Point;
    rotation:number;
    constructor(){
        this.position = new Point(0,0);
        this.rotation = 0;
    }
}