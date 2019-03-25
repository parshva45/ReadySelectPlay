import { Component, OnInit } from '@angular/core';
import {RoomServiceClient} from '../services/room.service.client';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roomService: RoomServiceClient,
              private router: Router,
              private snackBar: MatSnackBar) { }

  rooms = [];

  openSnackBar(message) {
    this.snackBar.open(message, null, {
      duration: 4000,
      panelClass: ['snackbar-position'],
      verticalPosition: 'bottom'
    });
  }

  editRoom(roomId, isVotingInProgress) {
    isVotingInProgress ? this.openSnackBar('Edit room operation not permitted when voting in progress!') :
      this.router.navigate(['room/' + roomId + '/friends']);
  }

  filterGames(roomId, isVotingInProgress) {
    isVotingInProgress ? this.openSnackBar('Filter games operation not permitted when voting in progress!') :
      this.router.navigate(['room/' + roomId + '/filters']);
  }

  vote(roomId, isVotingInProgress) {
    !isVotingInProgress ? this.openSnackBar('You cannot vote when voting is not in progress') :
      this.router.navigate(['room/' + roomId + '/voting']);
  }

  previousResults(roomId, results) {
    results.length === 0 ? this.openSnackBar('No history present!') :
      this.openSnackBar('GameIDs of previous winners : ' + results);
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
      .then(rooms => this.rooms = rooms.reverse());
  }

}
