import { Component, OnInit } from '@angular/core';
import {RoomServiceClient} from '../services/room.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roomService: RoomServiceClient,
              private router: Router) { }

  rooms = [];

  editRoom(roomId, isVotingInProgress) {
    isVotingInProgress ? alert('Voting in progress! Wait..') :
      this.router.navigate(['room/' + roomId + '/friends']);
  }

  filterGames(roomId, isVotingInProgress) {
    isVotingInProgress ? alert('Voting in progress! Wait..') :
      this.router.navigate(['room/' + roomId + '/filters']);
  }

  vote(roomId, isVotingInProgress) {
    !isVotingInProgress ? alert('Wait for party host to start voting..') :
      this.router.navigate(['room/' + roomId + '/voting']);
  }

  previousResults(roomId, results) {
    results.length === 0 ? alert('No history present!') :
      alert('GameIDs of previous winners : ' + results);
  }

  createRoom() {
    this.roomService
      .createRoom()
      .then(response => {
        this.router.navigate(['room/' + response._id + '/friends']);
      });
  }

  ngOnInit() {
    this.roomService
      .getAllRooms()
      .then(rooms => this.rooms = rooms);
  }

}
