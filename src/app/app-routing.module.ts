import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesComponent} from './games/games.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full'},
  { path: 'games', component: GamesComponent},
  { path: 'details/:gameId', component: GameDetailsComponent},
  { path: '**', component: GamesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
