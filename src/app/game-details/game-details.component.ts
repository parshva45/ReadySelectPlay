import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameServiceClient} from '../services/game.service.client';
import {Location} from '@angular/common';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private location: Location,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.setGameId(params));
  }

  gameId = '';
  game = {};

  setGameId(params) {
    this.gameId = params['gameId'];
    this.getGameById(this.gameId);
  }

  getGameById(gameId) {
    this.gameService.getGameById(gameId)
      .then(response => this.game = response);
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
