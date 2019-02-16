import { Component, OnInit } from '@angular/core';
import {GameServiceClient} from '../services/game.service.client';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private gameService: GameServiceClient) { }

  games = [];

  loadAllGames() {
    this.gameService
      .getAllGames()
      .then(games => this.games = games);
  }

  postGame(i) {
    this.gameService
      .getBgg(i)
      .then(game => {
        if (game.gameId) {
          this.gameService
            .createGame(game)
            .then(resp => console.log(resp.gameId));
        }
      });
  }

  myLoop(i) {
    setTimeout(() => {
      this.postGame(i);
      i++;
      if (i <= 2000) {
        this.myLoop(i);
      }
    }, 1000);
  }

  ngOnInit() {
    // for (let i = 1; i <= 1000; i++) {
    //   this.postGame(i);
    // }
    // const i = 1;
    // this.myLoop(i);
    this.loadAllGames();
  }

}
