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
            if (player.x + player.vx <= 0) {
                player.vx = 0;
                player.x = 0;
            }
            if (player.y + player.vy <= 0) {
                player.vy = 0;
                player.y = 0;
            }
            if (player.x + player.vx >= this.width) {
                player.vx = 0;
                player.x = this.width;
            }
            if (player.y + player.vy >= this.height) {
                player.vy = 0;
                player.y = this.width;
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
        if (bullet.x + bullet.vx <= 0) {
            return true;
        }
        if (bullet.y + bullet.vy <= 0) {
            return true;
        }
        if (bullet.x + bullet.vx >= this.width) {
            return true;
        }
        if (bullet.y + bullet.vy >= this.height) {
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