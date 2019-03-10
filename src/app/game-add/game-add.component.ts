import {Component, OnInit} from '@angular/core';
import {GameServiceClient} from '../services/game.service.client';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  constructor(private gameService: GameServiceClient) {
  }

  games = [];
  filteredGames = [];
  searchText = '';
  selected = [];

  search(searchText) {
    searchText = searchText.toLowerCase();
    this.filteredGames = this.games.filter(game => {
      return game.name.toLowerCase().includes(searchText) && this.selected.indexOf(game) === -1;
    });
  }

  select(game, index) {
    this.filteredGames.splice(index, 1);
    // for (let i = 0; i < this.filteredGames.length; i++ ) {
    //   if (this.filteredGames[i]._id === ppl._id) {
    //     this.games.splice(i, 1);
    //   }
    // }
    this.selected.push(game);
  }

  unselect(game, index) {
    this.selected.splice(index, 1);
    // for (let i = 0; i < this.selected.length; i++ ) {
    //   if (this.selected[i]._id === name._id) {
    //     this.selected.splice(i, 1);
    //   }
    // }
    this.filteredGames.push(game);
  }


  ngOnInit() {
    this.gameService.getAllGames()
      .then(response => {
          this.games = response;
          this.filteredGames = response;
        }
      );
  }

}
