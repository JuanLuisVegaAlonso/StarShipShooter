import { Player } from "./ships/player";
import { frameRate } from "../constants/gameConfig";
import { PlayerController, Actions } from "./playerController";
import { Bullet } from "./weapons/bullets/bullet";
import { Wall } from "./physics/wall-collision-detector";
import { GameObject } from "./GameObject";
import { BulletFactory } from "./weapons/bullets/bulletFactory";
import { WeaponFactory } from "./weapons/weaponFactory";

export class GameInstance {

    players: Player[];
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    timeout:any;
    playerController:PlayerController;
    gameObjects: GameObject[];
    _bulletFactory: BulletFactory;
    _weaponFactory: WeaponFactory;

    constructor(width: number, height: number,ctx: CanvasRenderingContext2D,playerController:PlayerController) {
        this.height = height;
        this.width = width;
        this.ctx = ctx;
        this.playerController = playerController;
        this.gameObjects = [];
        this._bulletFactory = new BulletFactory(this,(bullet) => this.bulletCollisionedOnWall(bullet));
        this._weaponFactory = new WeaponFactory(this);
    }
    public startGame(){
        this.loop();
    }
    private loop(){
        this.ctx.clearRect(0,0,this.width,this.height);

        // TODO change to allow multiple players
        if(this.players && this.players.length > 0){
            this.players[0].evaluateUserInput(this.playerController.evaluateInput());
        }
       // this.bulletWallColisionNotBucle();
        this.updateAllGameObjects();
        this.timeout = setTimeout(()=> this.loop(),frameRate);
    }

    private updateAllGameObjects(){
        for(const gameObject of this.gameObjects){
            gameObject.nextStep(this.ctx);
        }
    }
    private bulletCollisionedOnWall(bullet: Bullet){
        this.removeGameObject(bullet);
    }
    insertPlayers(players: Player[]){
        this.players = players;
        for(const player of players){
            this.addGameObject(player);
        }
    }
    public addGameObject(gameObject:GameObject){
        this.gameObjects.push(gameObject);
    }
    public removeGameObject(gameObject: GameObject){
        const gameObjectPosition  =this.gameObjects.indexOf(gameObject);
        if(gameObjectPosition !== -1){
            this.gameObjects.splice(gameObjectPosition,1);
        }
    }
}