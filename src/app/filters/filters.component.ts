import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {forEach} from '@angular/router/src/utils/collection';
import {GameServiceClient} from '../services/game.service.client';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private roomService: RoomServiceClient,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.getRoomById(params['roomId']));
  }

  games = [];

  getRoomById(roomId) {
    console.log(roomId);
    this.roomService
      .getRoomById(roomId)
      .then(room => this.getGames(room.games));
  }

  getGames(gameIds) {
    gameIds.forEach(gameId => {
      this.gameService
        .getGameById(gameId)
        .then(game => this.games.push(game));
    });
  }

  ngOnInit() {
  }

}
