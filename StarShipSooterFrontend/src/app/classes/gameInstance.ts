import { Player } from "./ships/player";
import { frameRate } from "../constants/gameConfig";
import { PlayerController, Action } from "./playerController";
import { Bullet, BulletEvent } from "./weapons/bullets/bullet";
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
        this._bulletFactory = new BulletFactory(this,(bulletEvent,bullet) => this.bulletCollisionedOnWall(bulletEvent,bullet));
        this._weaponFactory = new WeaponFactory(this, this._bulletFactory);
        this.resetGameInstance();
    }
   
    private loop(){
        this.ctx.clearRect(0,0,this.width,this.height);
        // TODO change to allow multiple players
        if(this.players && this.players.length > 0){
            this.players[0].evaluateUserInput(this.playerController.evaluateInput());
        }
        this.updateAllGameObjects();
        this.timeout = setTimeout(()=> this.loop(),frameRate);
    }

    private updateAllGameObjects(){
        for(const gameObject of this.gameObjects){
            gameObject.nextStep(this.ctx);
        }
    }
    private bulletCollisionedOnWall(bulletEvent:BulletEvent ,bullet: Bullet){
        switch(bulletEvent){
            case BulletEvent.WALL_HIT:
            this.removeGameObject(bullet);
            break;
        }
    }

    private resetPlayer(){
        if(this.players && this.players.length > 0){
            const player1 = this.players[0];
            player1.physicsController.locationInfo.position.x = 200;
            player1.physicsController.locationInfo.position.y = 200;
            player1.physicsController.velocity.x = -1;
            player1.physicsController.velocity.y = -1;
            player1.size = 100;
            player1.physicsController.locationInfo.rotation = Math.PI;
            player1.physicsController.drag = 0.01;
            player1.physicsController.forwardThrottle = 1;
            player1.physicsController.backwardThrottle = 0.5;
            player1.physicsController.torque = 0.05;
            player1.color = 'rgb(255,0,255)';
            player1.initShape();
        }
    }
    private resetGameInstance(){
        if(this.timeout){
            clearTimeout(this.timeout);
        }
        this.gameObjects = [];
        this.players = [];
    }
    // Public API
    public addGameObject(gameObject:GameObject){
        this.gameObjects.push(gameObject);
    }
    public removeGameObject(gameObject: GameObject){
        const gameObjectPosition  =this.gameObjects.indexOf(gameObject);
        if(gameObjectPosition !== -1){
            this.gameObjects.splice(gameObjectPosition,1);
        }
    }
    public startGame(){
        this.resetGameInstance();
        const player1 = new Player(
                                    1,
                                    GameObject.initGameObject(),
                                    this._weaponFactory.createWeapon()
                                );
        this.players.push(player1);
        this.addGameObject(player1);
        this.resetPlayer();
        this.loop();
    }

    get player1 (){
        if(this.players && this.players.length > 0){
            return this.players[0];
        }
        return undefined;
    }

}