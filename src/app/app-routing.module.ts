import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesComponent} from './games/games.component';
import {HomeComponent} from './home/home.component';
import {GameResultComponent} from './game-result/game-result.component';
import {VotingCountComponent} from './voting-count/voting-count.component';
import {FiltersComponent} from './filters/filters.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'games', component: GamesComponent},
  { path: 'room/:roomId/game/:gameId', component: GameDetailsComponent},
  { path: 'room/:roomId/result', component: GameResultComponent},
  { path: 'room/:roomId/voting/count', component: VotingCountComponent},
  { path: 'room/:roomId/filters', component: FiltersComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
