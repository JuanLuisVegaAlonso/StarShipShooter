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
  gameInstance:GameInstance;
  key = [];
  showingMoreInfo:boolean;
  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById("canvas");
    const ctx = this.canvas.getContext('2d');
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
    
    const playerController = new PlayerController(this.key);
    this.gameInstance = new GameInstance(width,height,ctx, playerController);
    this.gameInstance.startGame();
  }

  public showMoreInfo(){
    this.showingMoreInfo = true;
  }
  public showLessInfo(){
    this.showingMoreInfo = false;
  }
  fullReset(){
    this.gameInstance.startGame();
  }
  get player1(){
    return this.gameInstance.player1;
  }
}
