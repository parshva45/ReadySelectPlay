import {Component, OnInit} from '@angular/core';
import {GameServiceClient} from '../services/game.service.client';
import {RoomServiceClient} from '../services/room.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.css']
})
export class GameAddComponent implements OnInit {

  constructor(private gameService: GameServiceClient,
              private roomService: RoomServiceClient,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }

  roomId = '';
  games = [];
  selectedGameIds = [];
  filteredGames = [];
  searchText = '';
  selected = [];

  search(searchText) {
    searchText = searchText.toLowerCase();
    this.filteredGames = this.games.filter(game => {
      return (game.name.toLowerCase().includes(searchText) || (game.yearPublished.toString()).includes(searchText))
        && this.selected.indexOf(game) === -1;
    });
    this.sortFilteredGames();
  }

  select(game, index) {

    this.roomService
      .addGame(this.roomId, game.gameId)
      .then(response => {
        this.filteredGames.splice(index, 1);
        this.selected.push(game);
        this.sortFilteredGames();
        this.sortSelectedGames();
      });
  }

  unselect(game, index) {
    this.roomService
      .removeGame(this.roomId, game.gameId)
      .then(response => {
        this.selected.splice(index, 1);
        this.filteredGames.push(game);
        this.sortFilteredGames();
        this.sortSelectedGames();
      });
  }

  goBack() {
    this.location.back();
  }

  next() {
    this.router.navigate(['room/' + this.roomId + '/details']);
  }

  sortFilteredGames() {
    this.filteredGames.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  sortSelectedGames() {
    this.selected.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  ngOnInit() {

    this.roomService
      .getRoomById(this.roomId)
      .then(room => {
        this.selectedGameIds = room.games;
        this.gameService.getAllGames()
          .then(response => {
              response.forEach(game => {
                this.games.push(game);
                if (this.selectedGameIds.indexOf(game.gameId) > -1) {
                  this.selected.push(game);
                  this.sortSelectedGames();
                } else {
                  this.filteredGames.push(game);
                  this.sortFilteredGames();
                }
              });
            }
          );
      });
  }

}
