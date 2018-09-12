import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../classes/player';
import { ForceColor } from '../classes/forcesColor';
import { frameRate } from '../constants/gameConfig';

@Component({
  selector: 'app-player-forces',
  templateUrl: './player-forces.component.html',
  styleUrls: ['./player-forces.component.scss']
})
export class PlayerForcesComponent implements OnInit {

  @Input()
  private width:number;

  @Input()
  private height:number;

  @Input()
  private player:Player;

  @Input()
  private forceColors:ForceColor;

  private canvas: any;
  private ctx: CanvasRenderingContext2D;
  private middle:number[] = [];
  constructor() { }

  ngOnInit() {
    if(!this.player) throw new Error("Player is required")    
    this.middle[0] = this.width/2;
    this.middle[1] = this.height/2;
    if(!this.forceColors){
      this.forceColors = <ForceColor>{};
      this.forceColors.drag = 'red';
      this.forceColors.engineForce = 'black';
      this.forceColors.rollDrag = 'yellow';
    }

   
    this.canvas = document.getElementById("canvasForces");
    this.ctx = this.canvas.getContext('2d');
    this.loop();
    
  }

  loop(){
    this.ctx.clearRect(0,0,this.width,this.height)
    this.ctx.lineWidth = 3;
    this.drawDragForce();
    this.drawRollDragForce();
    this.drawEngineForce();
    setTimeout(() => this.loop(),frameRate/1000)
  }

  private drawDragForce(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.forceColors.drag;
    this.ctx.moveTo(this.middle[0],this.middle[1]);
    this.ctx.lineTo(this.middle[0] + this.player.physicsController.dragForce.x*100,this.middle[1] + this.player.physicsController.dragForce.y *100 );
    
    this.ctx.stroke();
  }

  private drawRollDragForce(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.forceColors.rollDrag;
    this.ctx.moveTo(this.middle[0],this.middle[1]);
    this.ctx.lineTo(this.middle[0] +this.player.physicsController.rollingForce.x *100, this.middle[1] +this.player.physicsController.rollingForce.y*100);
    this.ctx.stroke();
  }

  private drawEngineForce(){
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.forceColors.engineForce;
    this.ctx.moveTo(this.middle[0],this.middle[1]);
    this.ctx.lineTo(this.middle[0] +this.player.physicsController.engineForce.y * 100,this.middle[1]+this.player.physicsController.engineForce.y*100 );
    this.ctx.stroke();
  }


}
