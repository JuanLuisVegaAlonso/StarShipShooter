import { Component, OnInit } from '@angular/core';
import { Context } from 'vm';
import { Player } from '../classes/ships/player';
import { keys } from '../constants/keys';
import { width, height } from '../constants/canvasSize';
import { frameRate } from '../constants/gameConfig';
import { GameInstance } from '../classes/gameInstance';
import { PlayerController } from '../classes/playerController';
import { GameObject } from '../classes/GameObject';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent implements OnInit {

  width = width;
  height = height;
  canvas: any;
  ctx: CanvasRenderingContext2D;
  player1: Player;
  gameInstance:GameInstance;
  playerController:PlayerController;
  key = [];
  timeout:any;
  showingMoreInfo:boolean;
  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext('2d');
    document.body.onmouseover = () => {
      this.canvas.focus();
    }
    //document.addEventListener('keypress', (event) => this.keyListener(event));
    document.addEventListener('keyup', (event) => {
      this.key[event.keyCode] = event.type == 'keydown';
    }, false);
    document.addEventListener('keydown', (event) => {
      this.key[event.keyCode] = event.type == 'keydown';
    }, false);
    
    this.playerController = new PlayerController(this.key);
    this.gameInstance = new GameInstance(width,height,this.ctx,this.playerController);
    this.player1 = new Player(1,GameObject.initGameObject(),this.gameInstance._weaponFactory.createWeapon(GameObject.initGameObject(),this.gameInstance._bulletFactory));
    this.reset();
    this.gameInstance.insertPlayers([this.player1]);
    this.gameInstance.startGame();
  }

  public showMoreInfo(){
    this.showingMoreInfo = true;
  }
  public showLessInfo(){
    this.showingMoreInfo = false;
  }
  public reset(){
    this.player1.physicsController.locationInfo.position.x = 200;
    this.player1.physicsController.locationInfo.position.y = 200;
    this.player1.physicsController.velocity.x = -1;
    this.player1.physicsController.velocity.y = -1;
    this.player1.size = 100;
    this.player1.physicsController.locationInfo.rotation = Math.PI;
    this.player1.physicsController.drag = 0.01;
    this.player1.physicsController.forwardThrottle = 1;
    this.player1.physicsController.backwardThrottle = 0.5;
    this.player1.physicsController.torque = 0.05;
    this.player1.color = 'rgb(255,0,255)';
    this.player1.initShape();
    
  }
  fullReset(){
    this.reset();
    clearTimeout(this.gameInstance.timeout);
    this.gameInstance.startGame();
  }
}
