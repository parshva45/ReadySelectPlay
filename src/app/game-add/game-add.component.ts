import { Component, OnInit } from '@angular/core';
import {GameServiceClient} from '../services/game.service.client';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  constructor(private gameService: GameServiceClient) { }
  games = [];
  selected = [];
  select(ppl) {
    for (let i = 0; i < this.games.length; i++ ) {
      if (this.games[i]._id === ppl._id) {
        this.games.splice(i, 1);
      }
    }
    this.selected.push(ppl);
  }
  unselect(name) {
    for (let i = 0; i < this.selected.length; i++ ) {
      if (this.selected[i]._id === name._id) {
        this.selected.splice(i, 1);
      }
    }
    this.games.push(name);
  }



  ngOnInit() {
    this.gameService.getAllGames()
      .then(response => this.games = response
      );
  }

}
