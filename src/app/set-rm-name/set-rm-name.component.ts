import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-set-rm-name',
  templateUrl: './set-rm-name.component.html',
  styleUrls: ['./set-rm-name.component.css']
})
export class SetRmNameComponent implements OnInit {

  constructor(private location: Location,
              private router: Router,
              private route: ActivatedRoute,
              private roomService: RoomServiceClient) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }

  roomId = '';
  room = {};

  goBack() {
    this.location.back();
  }

  submit() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.roomService
      .getRoomById(this.roomId)
      .then(room => {
        this.room = room;
      });
  }

}
