import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WebSocketComponent } from './web-socket/web-socket.component';
import { GameWrapperComponent } from './game-wrapper/game-wrapper.component';
import { PlayerInfoComponent } from './player-info/player-info.component';


@NgModule({
  declarations: [
    AppComponent,
    WebSocketComponent,
    GameWrapperComponent,
    PlayerInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
