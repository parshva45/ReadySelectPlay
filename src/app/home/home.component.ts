import { Component, OnInit } from '@angular/core';
import {RoomServiceClient} from '../services/room.service.client';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

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
      duration: 2000,
      panelClass: ['snackbar-position'],
      verticalPosition: 'bottom'
    });
  }

  openVSnackBar(message) {
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
    !isVotingInProgress ?
      this.openVSnackBar('Voting not in progress. Go to Filter Games page and Initiate Voting Process to begin voting!') :
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

  deleteRoom(roomId, i) {
    this.roomService
      .deleteRoom(roomId)
      .then(res => this.rooms.splice(i, 1));
  }

  ngOnInit() {
    this.roomService
      .getAllRooms()
      .then(rooms => {
        rooms.sort((a, b) => {
          const textA = a.name.toUpperCase();
          const textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        this.rooms = rooms;
      });
  }

}
