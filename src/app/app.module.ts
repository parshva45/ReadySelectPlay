import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import {GameServiceClient} from './services/game.service.client';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { GameDetailsComponent } from './game-details/game-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    NavBarComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GameServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
