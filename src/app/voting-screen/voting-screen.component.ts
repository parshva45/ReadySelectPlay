import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {GameServiceClient} from '../services/game.service.client';
import {Location} from '@angular/common';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.css']
})
export class VotingScreenComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private roomService: RoomServiceClient,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.getRoomById(params['roomId']));
  }

  roomId = '';
  filteredGames = [];

  goBack() {
    this.location.back();
  }

  goToGameDetails(gameId) {
    this.router.navigate(['room/' + this.roomId + '/game/' + gameId]);
  }

  getRoomById(roomId) {
    this.roomId = roomId;
    // this.roomService
    //   .getRoomById(roomId)
    //   .then(room => this.getGames(room.games));
  }

  submitVote() {
  //  empty for now
  }

  ngOnInit() {
  }

}
