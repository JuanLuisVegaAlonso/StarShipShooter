import { Vector } from "./vector";

export class Point {
    private _x;
    private _y;
    constructor(x:number,y:number){
        this._x = x;
        this._y = y;
    }

    public get x(){
        return this._x;
    }
    
    public get y(){
        return this._y;
    }

    public set x(x:number){
        this._x = x;
    }
    public set y(y:number){
        this._y = y;
    }
    public move(vector: Vector){
        this._x = this._x + vector.x;
        this._y = this._y + vector.y;
    }

}