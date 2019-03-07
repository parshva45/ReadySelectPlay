import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import {GameServiceClient} from './services/game.service.client';
import { GameDetailsComponent } from './game-details/game-details.component';
import { HomeComponent } from './home/home.component';
import { GameResultComponent } from './game-result/game-result.component';
import { VotingCountComponent } from './voting-count/voting-count.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailsComponent,
    HomeComponent,
    GameResultComponent,
    VotingCountComponent
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
