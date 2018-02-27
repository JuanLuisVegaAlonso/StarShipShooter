import { Component, OnInit,Input } from '@angular/core';
import { Player } from '../classes/player';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent implements OnInit {

  @Input()
  player:Player;
  constructor() { }

  ngOnInit() {
  }

}
