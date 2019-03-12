import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {GameServiceClient} from '../services/game.service.client';

@Component({
  selector: 'app-set-rm-name',
  templateUrl: './set-rm-name.component.html',
  styleUrls: ['./set-rm-name.component.css']
})
export class SetRmNameComponent implements OnInit {

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private roomService: RoomServiceClient,
              private userService: UserServiceClient,
              private gameService: GameServiceClient) {
    this.route.params.subscribe(params => this.getRoom(params['roomId']));
  }

  roomId = '';
  roomName = '';
  users = [];
  games = [];

  getRoom(roomId) {
    this.roomId = roomId;
    this.roomService
      .getRoomById(roomId)
      .then(room => {
        this.roomName = room.name;
        this.getUsers(room.users);
        this.getGames(room.games);
      });
  }

  getUsers(userIds) {
    userIds.forEach(userId => {
      this.userService
        .getUserById(userId)
        .then(user => this.users.push(user));
    });
  }

  getGames(gameIds) {
    gameIds.forEach(gameId => {
      this.gameService
        .getGameById(gameId)
        .then(game => this.games.push(game));
    });
  }

  goBack() {
    this.location.back();
  }

  submit() {
    this.roomService
      .setName(this.roomId, {name: this.roomName})
      .then(res => this.router.navigate(['home']));
  }

  ngOnInit() {
  }

}
