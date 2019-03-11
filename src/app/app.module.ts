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
import {RoomServiceClient} from './services/room.service.client';
import { FiltersComponent } from './filters/filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatBadgeModule, MatChipsModule,
  MatListModule, MatSidenavModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAddComponent } from './user-add/user-add.component';
import { VotingResultComponent } from './voting-result/voting-result.component';
import {UserServiceClient} from './services/user.service.client';
import { GameAddComponent } from './game-add/game-add.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailsComponent,
    HomeComponent,
    GameResultComponent,
    VotingCountComponent,
    FiltersComponent,
    UserAddComponent,
    VotingResultComponent,
    GameAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule
  ],
  providers: [
    GameServiceClient,
    RoomServiceClient,
    UserServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
