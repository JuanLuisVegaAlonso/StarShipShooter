import { Component, OnInit } from '@angular/core';
import { Context } from 'vm';
import { Player } from '../classes/player';
import { keys } from '../constants/keys';
import { width, height } from '../constants/canvasSize';
import { Bullet } from '../classes/bullet';
import { frameRate } from '../constants/gameConfig';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent implements OnInit {

  canvas: any;
  ctx: CanvasRenderingContext2D;
  player1: Player = new Player();
  key = [];
  bullets:Bullet[] = [];
  timeout:any;
  showingMoreInfo:boolean;
  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById("canvas");
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
    this.ctx = this.canvas.getContext('2d');
    this.reset();
      
    this.nextStep();

  }

  public showMoreInfo(){
    this.showingMoreInfo = true;
  }
  public showLessInfo(){
    this.showingMoreInfo = false;
  }
  private nextStep() {
    this.ctx.clearRect(0, 0, width, height);
    this.keyListener();
    this.wallCollision(this.player1);
    this.player1.nextStep();
    this.ctx.fillStyle = this.player1.color;  
    this.ctx.fill(this.player1.getShape().shape);
    this.player1.ownBullets  = this.player1.ownBullets.filter((bullet) => !this.bulletWallCollision(bullet));
    this.drawBullets(this.player1.ownBullets);
    this.keyListener();
    this.timeout = setTimeout(() => this.nextStep(), frameRate);
  }

  public keyListener() {
    let length = this.key.length;
    for (let i = 0; i < length; i++) {
      if (this.key[i]) {
        switch (i) {
          case keys.keyA:
            this.player1.changeRotation(this.player1.torque);
            break;
          case keys.keyD:
            this.player1.changeRotation(-this.player1.torque);
            break;
          case keys.keyW:
            this.player1.forward(this.player1.forwardThrottle);
            break;
          case keys.keyS:
            this.player1.forward(-this.player1.backwardThrottle);
            break;
          case keys.spaceBar:
            this.player1.shoot();
            break;
          default:
            //console.log(i);
            break;
        }
      }
    }
  }

  public reset(){
    this.player1 = new Player();
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
  }

  public fullReset(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
    this.reset();
    this.nextStep();
    this.canvas.focus();
  }
  private drawBullets(bullets:Bullet[]){
    for(let bullet of bullets){
      bullet.nextStep();
      this.ctx.fillStyle = bullet.color;  
      this.ctx.fill(bullet.getShape().shape);
    }
  }
  private wallCollision(player:Player){
    if(player.x + player.vx <= 0 ){
      player.vx = 0;
      player.x = 0;
    }
    if(player.y + player.vy <= 0){
      player.vy = 0;
      player.y = 0;
    }
    if(player.x + player.vx >= width){
      player.vx = 0;
      player.x = width;
    }
    if(player.y + player.vy >= height){
      player.vy = 0;
      player.y = width;
    }
  }
  private bulletWallCollision(bullet:Bullet):boolean{
    if(bullet.x + bullet.vx <= 0 ){
      return true;
    }
    if(bullet.y + bullet.vy <= 0){
      return true;
    }
    if(bullet.x + bullet.vx >= width){
      return true;
    }
    if(bullet.y + bullet.vy >= height){
      return true;
    }
    return false;
  }
}
