import { Drawable } from "./drawable";
import { Vector } from "./vector";
import { Point } from "./point";
import { LocationInfo } from "./locationInfo";
import { PhysicsController } from "./physics/physics-controller";
import { WallCollisionDetector } from "./physics/wall-collision-detector";


export interface GameObjectDependencies {
    physicsController: PhysicsController;
    wallCollisionDetector: WallCollisionDetector;
}

export abstract class GameObject {

    static initGameObject() {
        const locationInfo = new LocationInfo();
        const physicsController = new PhysicsController(locationInfo);
        const wallCollisionDetector = new WallCollisionDetector(physicsController);
        return { physicsController,wallCollisionDetector};
    }
    physicsController: PhysicsController;
    wallCollisionDetector: WallCollisionDetector;
    size:number;
    protected shape: Drawable;
    color: string;
    constructor(gameObjectDependencies:GameObjectDependencies){
        this.physicsController = gameObjectDependencies.physicsController;
        this.wallCollisionDetector = gameObjectDependencies.wallCollisionDetector;
    }
    abstract nextStep(context: CanvasRenderingContext2D);
    
    getShape(){
        return this.shape;
    }
}