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

  ngOnInit() {
    this.loadAllGames();
  }

}
