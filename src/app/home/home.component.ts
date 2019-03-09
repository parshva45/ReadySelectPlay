import { Component, OnInit } from '@angular/core';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roomService: RoomServiceClient) { }

  rooms = [];

  editRoom(roomId, isVotingInProgress) {
    isVotingInProgress ? alert('Voting in progress! Wait..') :
    alert('Edit room with ID : ' + roomId);
  }

  filterGames(roomId, isVotingInProgress) {
    isVotingInProgress ? alert('Voting in progress! Wait..') :
      alert('Filter games in room with ID : ' + roomId);
  }

  vote(roomId, isVotingInProgress) {
    !isVotingInProgress ? alert('Wait for party host to start voting..') :
      alert('Vote among filtered games in room with ID : ' + roomId);
  }

  previousResults(roomId, results) {
    results.length === 0 ? alert('No history present!') :
      alert('GameIDs of previous winners : ' + results);
  }

  ngOnInit() {
    this.roomService
      .getAllRooms()
      .then(rooms => this.rooms = rooms);
  }

}
