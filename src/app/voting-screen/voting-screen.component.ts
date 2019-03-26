import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {GameServiceClient} from '../services/game.service.client';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';

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
              private gameService: GameServiceClient,
              private snackBar: MatSnackBar) {
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
  }
  submitVote() {
    if (this.result.length === 0) {
      this.snackBar.open('Please vote for at least one game!', null, {
        duration: 2000,
        panelClass: ['snackbar-position'],
        verticalPosition: 'bottom'
      });
    } else {
      const item = this.result[Math.floor(Math.random() * this.result.length)] ;
      this.roomService.addVotes(this.roomId, this.result)
        .then(res => {
          this.router.navigate(['room/' + this.roomId + '/voting/count']);
        });
      // this.roomService.addResult(this.roomId, item)
    }
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
