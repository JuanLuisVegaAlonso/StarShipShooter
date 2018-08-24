export class Vector{
    private _x:number;
    private _y:number;

    constructor(x:number,y:number){
        this._x = x;
        this._y = y;
    }

    public getModule():number{
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    public getNormalized(): Vector{
        const moduleCalc = this.getModule();
        let normalizedX = 0;
        let normalizedY = 0;
        if(moduleCalc !== 0){
            normalizedX = this.x/this.getModule();
            normalizedY = this.y/this.getModule();    
        }
        return new Vector(normalizedX,normalizedY);
    }

    public escalarMultiply(escalar:number):Vector{
        this._x = escalar * this._x;
        this._y = escalar * this._y;
        return this;
    }
    public escalarDivide(escalar:number):Vector{
        this._x = this._x / escalar;
        this._y = this._y / escalar;
        return this;
    }
    public add(otherVector:Vector):Vector{
        this._x = this._x + otherVector.x;
        this._y = this._y + otherVector.y;
        return this;
    }
    public changeDirection(newX:number ,newY:number){
        this._x = newX;
        this._y = newY;
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
}