import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-voting-count',
  templateUrl: './voting-count.component.html',
  styleUrls: ['./voting-count.component.css']
})
export class VotingCountComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private roomService: RoomServiceClient) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }

  roomId = '';
  roomUsersCount = 1;

  viewResult() {
    this.router.navigate(['room/' + this.roomId + '/voting/result']);
  }

  goBack() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.roomService
      .getRoomById(this.roomId)
      .then(room => this.roomUsersCount = room.users.length);
  }

}
