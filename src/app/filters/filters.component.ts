import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {GameServiceClient} from '../services/game.service.client';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomServiceClient,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.getRoomById(params['roomId']));
  }

  roomId = '';
  games = [];

  getRoomById(roomId) {
    this.roomId = roomId;
    this.roomService
      .getRoomById(roomId)
      .then(room => this.getGames(room.games));
  }

  getGames(gameIds) {
    gameIds.forEach(gameId => {
      this.gameService
        .getGameById(gameId)
        .then(game => {
          this.games.push(game);
          if (this.games.length === gameIds.length) {
            this.games.sort((a, b) => {
              const textA = a.name.toUpperCase();
              const textB = b.name.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
          }
        });
    });
  }

  goToGameDetails(gameId) {
    this.router.navigate(['room/' + this.roomId + '/game/' + gameId]);
  }

  ngOnInit() {
  }

}
