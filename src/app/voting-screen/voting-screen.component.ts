import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {GameServiceClient} from '../services/game.service.client';
import {Location} from '@angular/common';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingScreenComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private roomService: RoomServiceClient,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }
  vm = this;
  roomId = '';
  filteredGames = [];
  games = [];
  result = [];

  goBack() {
    this.router.navigate(['home']);
  }

  goToGameDetails(gameId) {
    this.router.navigate(['room/' + this.roomId + '/game/' + gameId]);
  }

  selectedGame(game) {
    const index = this.result.indexOf(game.gameId);
    if (index > -1) {
      this.result.splice(index,1);
    } else {
      this.result.push(game.gameId);
    }
    console.log(this.result);
  }
  submitVote() {
    const item = this.result[Math.floor(Math.random() * this.result.length)] ;
    this.roomService.addResult(this.roomId, item)
      .then(res => {
        console.log(res);
        this.router.navigate(['room/' + this.roomId + '/voting/count']);
      });
  }

  ngOnInit() {
    this.roomService.getRoomById(this.roomId)
      .then(room => room.filteredGames.forEach(function(game) {
        this.gameService.getGameById(game)
          .then(function(gameObj) {
            this.games.push(gameObj);
          }.bind(this));
      }.bind(this)
      ));
  }

}
