import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameDetailsComponent} from './game-details/game-details.component';
import {GamesComponent} from './games/games.component';
import {HomeComponent} from './home/home.component';
import {GameResultComponent} from './game-result/game-result.component';
import {VotingCountComponent} from './voting-count/voting-count.component';
import {FiltersComponent} from './filters/filters.component';
import {UserAddComponent} from './user-add/user-add.component';
import {VotingResultComponent} from './voting-result/voting-result.component';
import {GameAddComponent} from './game-add/game-add.component';
import {SetRmNameComponent} from './set-rm-name/set-rm-name.component';
import {VotingScreenComponent} from './voting-screen/voting-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'games', component: GamesComponent},
  { path: 'room/:roomId/friends', component: UserAddComponent},
  { path: 'room/:roomId/games', component: GameAddComponent},
  { path: 'room/:roomId/details', component: SetRmNameComponent},
  { path: 'room/:roomId/game/:gameId', component: GameDetailsComponent},
  { path: 'room/:roomId/result', component: GameResultComponent},
  { path: 'room/:roomId/voting', component: VotingScreenComponent},
  { path: 'room/:roomId/voting/count', component: VotingCountComponent},
  { path: 'room/:roomId/filters', component: FiltersComponent},
  { path: 'room/:roomId/voting/result', component: VotingResultComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
