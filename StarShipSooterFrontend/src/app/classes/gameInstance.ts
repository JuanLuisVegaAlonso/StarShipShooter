import { Player } from "./player";
import { Bullet } from "./bullet";
import { frameRate } from "../constants/gameConfig";
import { PlayerController } from "./playerController";

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
            if (player.position.x + player.velocity.x <= 0) {
                player.velocity.x = 0;
                player.position.x = 0;
            }
            if (player.position.y + player.velocity.y <= 0) {
                player.velocity.y = 0;
                player.position.y = 0;
            }
            if (player.position.x + player.velocity.x >= this.width) {
                player.velocity.x = 0;
                player.position.x = this.width;
            }
            if (player.velocity.y + player.velocity.y >= this.height) {
                player.velocity.y = 0;
                player.position.y = this.width;
            }
        }
    }
    private nextStep(){
        for(let player of this.players){
            player.nextStep();
        }
    }

    private bulletWallColisionNotBucle(){
        for(const player  of this.players){
            player.ownBullets = player.ownBullets.filter(bullet => !this.bulletWallColision(bullet));
        }
    }
    private bulletWallColision(bullet:Bullet) {
        if (bullet.position.x + bullet.velocity.x <= 0) {
            return true;
        }
        if (bullet.position.y + bullet.velocity.y <= 0) {
            return true;
        }
        if (bullet.position.x + bullet.velocity.x >= this.width) {
            return true;
        }
        if (bullet.position.y + bullet.velocity.y >= this.height) {
            return true;
        }
        return false;
    }

    insertPlayers(players: Player[]){
        this.players = players;
        for(const player of this.players){
            player.getShape().initContext(this.ctx);
        }
    }
}