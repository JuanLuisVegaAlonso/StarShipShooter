import { Component, OnInit } from '@angular/core';
import { Context } from 'vm';
import { Player } from '../classes/player';
import { keys } from '../constants/keys';
import { width, height } from '../constants/canvasSize';
import { Bullet } from '../classes/bullet';
import { frameRate } from '../constants/gameConfig';
import { GameInstance } from '../classes/gameInstance';
import { PlayerController } from '../classes/playerController';

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
  player1: Player = new Player(1);
  gameInstance:GameInstance;
  playerController:PlayerController;
  key = [];
  bullets:Bullet[] = [];
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
    
    this.player1 = new Player(1);
    this.reset();
    this.playerController = new PlayerController(this.player1,this.key);
    this.gameInstance = new GameInstance(width,height,this.ctx,this.playerController);
    this.gameInstance.insertPlayers([this.player1]);
    this.gameInstance.loop();
  }

  public showMoreInfo(){
    this.showingMoreInfo = true;
  }
  public showLessInfo(){
    this.showingMoreInfo = false;
  }
  public reset(){
    this.player1.x = 200;
    this.player1.y = 200;
    this.player1.vx = -1;
    this.player1.vy = -1;
    this.player1.size = 30;
    this.player1.rotation = Math.PI;
    this.player1.drag = 0.01;
    this.player1.forwardThrottle = 1;
    this.player1.backwardThrottle = 0.5;
    this.player1.torque = 0.05;
    this.player1.color = 'rgb(255,0,255)';
    this.player1.initShape();
    this.player1.getShape().initContext(this.ctx);
    
  }
  fullReset(){
    this.reset();
    clearTimeout(this.gameInstance.timeout);
    this.gameInstance.loop();
  }
}
