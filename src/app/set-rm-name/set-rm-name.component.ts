import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-set-rm-name',
  templateUrl: './set-rm-name.component.html',
  styleUrls: ['./set-rm-name.component.css']
})
export class SetRmNameComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private roomService: RoomServiceClient,
              private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.getRoomById(params['roomId']));
  }

  roomId = '';
  addedPeople = [];

  goBack() {
    this.location.back();
  }
  getRoomById(roomId) {
    this.roomId = roomId;
    // this.roomService
    //   .getRoomById(roomId)
    //   .then(room => this.getGames(room.games));
  }

  ngOnInit() {
  }

}
