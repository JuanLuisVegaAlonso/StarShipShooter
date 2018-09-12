import { Player } from "./player";
import { frameRate } from "../constants/gameConfig";
import { PlayerController } from "./playerController";
import { Bullet } from "./weapons/bullets/bullet";
import { Wall } from "./physics/wall-collision-detector";

export class GameInstance {

    players: Player[];
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    timeout:any;
    playerController:PlayerController;

    constructor(width: number, height: number,ctx: CanvasRenderingContext2D,playerController:PlayerController) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.playerController = playerController;
    }
    public loop(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.playerController.evaluateInput();
        this.wallCollision();
        this.bulletWallColisionNotBucle();
        this.nextStep();
        this.timeout = setTimeout(()=> this.loop(),frameRate);
    }

    private wallCollision() {
        for (const player of this.players) {
            const collisions = player.wallCollisionDetector.getCollitions();
            for(let collision of collisions){
                switch (collision){
                    case Wall.LEFT:
                        player.physicsController.velocity.x = 0;
                        player.physicsController.locationInfo.position.x = 0;
                    break;
                    case Wall.TOP:
                        player.physicsController.velocity.y = 0;
                        player.physicsController.locationInfo.position.y = 0;
                    break;
                    case Wall.RIGHT:
                        player.physicsController.velocity.x = 0;
                        player.physicsController.locationInfo.position.x = this.width;
                    break;
                    case Wall.BOT:
                        player.physicsController.velocity.y = 0;
                        player.physicsController.locationInfo.position.y = this.width;
                    break;
                }
            }
        }
    }
    private nextStep(){
        for(let player of this.players){
            player.nextStep(this.ctx);
        }
    }

    private bulletWallColisionNotBucle(){
        for(const player  of this.players){
            player.weapon.ownBullets = player.weapon.ownBullets.filter(bullet => !this.bulletWallColision(bullet));
        }
    }
    private bulletWallColision(bullet:Bullet) {
        const collisions = bullet.wallCollisionDetector.getCollitions();
        if( collisions.length > 0){
            return true;
        }
        return false;
    }

    insertPlayers(players: Player[]){
        this.players = players;
    }
}