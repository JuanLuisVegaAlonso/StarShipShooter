import { Drawable } from "./drawable";
import { Vector } from "./vector";
import { Point } from "./point";
import { LocationInfo } from "./locationInfo";
import { PhysicsController } from "./physics/physics-controller";
import { WallCollisionDetector } from "./physics/wall-collision-detector";
export abstract class GameObject{
    physicsController: PhysicsController;
    wallCollisionDetector: WallCollisionDetector;
    size:number;
    protected shape: Drawable;
    color: string;
    locationInfo:LocationInfo;
    constructor(){
        this.physicsController = new PhysicsController();
        this.wallCollisionDetector = new WallCollisionDetector(this.physicsController);
        this.locationInfo = new LocationInfo();

    }
    abstract nextStep(context: CanvasRenderingContext2D);
    
    getShape(){
        return this.shape;
    }
}