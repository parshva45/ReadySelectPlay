import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesComponent} from './games/games.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'games', component: GamesComponent},
  { path: 'details/:gameId', component: GameDetailsComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
