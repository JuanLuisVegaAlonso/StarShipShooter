import { LocationInfo } from "../locationInfo";
import { PhysicsController } from "./physics-controller";
import { height, width } from "../../constants/canvasSize";

export enum Wall {
    TOP, LEFT, RIGHT, BOT
}

export class WallCollisionDetector {
    private physicsController:PhysicsController;
    constructor(physicsController: PhysicsController) {
        this.physicsController = physicsController;
    }
    getCollitions(): Wall[] {
        const collisions = [];
        if (this.physicsController.locationInfo.position.x + this.physicsController.velocity.x <= 0) {
            collisions.push(Wall.LEFT);
        }
        if (this.physicsController.locationInfo.position.y + this.physicsController.velocity.y <= 0) {
            collisions.push(Wall.TOP);
        }
        if (this.physicsController.locationInfo.position.x + this.physicsController.velocity.x >= width) {
            collisions.push(Wall.RIGHT);
        }
        if (this.physicsController.locationInfo.position.y + this.physicsController.velocity.y >= height) {
            collisions.push(Wall.BOT);
        }
        return collisions;
    }
}
