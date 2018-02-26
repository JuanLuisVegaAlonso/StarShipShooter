import { Component, OnInit } from '@angular/core';
import { Context } from 'vm';
import { Player } from '../classes/player';
import { keys } from '../constants/keys';
import { width, heigh } from '../constants/canvasSize';
import { Bullet } from '../classes/bullet';

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

  public nextStep() {
    this.ctx.clearRect(0, 0, 800, 800);
    this.keyListener();
    this.wallCollision(this.player1);
    this.player1.nextStep();
    this.ctx.fillStyle = this.player1.color;  
    this.ctx.fill(this.player1.shape);
    this.bullets  = this.bullets.filter((bullet) => !this.bulletWallCollision(bullet));
    this.drawBullets();
    this.keyListener();
    setTimeout(() => this.nextStep(), 1000 / 60);
  }

  public keyListener() {
    let length = this.key.length;
    for (let i = 0; i < length; i++) {
      if (this.key[i]) {
        switch (i) {
          case keys.keyA:
            this.player1.changeRotation(0.05);
            break;
          case keys.keyD:
            this.player1.changeRotation(-0.05);
            break;
          case keys.keyW:
            this.player1.forward(0.2);
            break;
          case keys.keyS:
            this.player1.forward(-0.2);
            break;
          case keys.spaceBar:
            this.bullets.push(this.player1.shoot());
            break;
          default:
            console.log(i);
            break;
        }
      }
    }
  }

  public reset(){
    this.player1.x = 20;
    this.player1.y = 20;
    this.player1.vx = 1;
    this.player1.vy = 1;
    this.player1.size = 30;
    this.player1.rotation = Math.PI;
    this.player1.drag = 0.01;
    this.player1.color = 'rgb(255,0,255)';
  }

  private drawBullets(){
    for(let bullet of this.bullets){
      bullet.nextStep();
      this.ctx.fillStyle = bullet.color;  
      this.ctx.fill(bullet.shape);
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
    if(player.y + player.vy >= heigh){
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
    if(bullet.y + bullet.vy >= heigh){
      return true;
    }
    return false;
  }
}
