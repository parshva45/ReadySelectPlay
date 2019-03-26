import {Component, OnInit} from '@angular/core';
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
  votes = [];

  getWinner() {
    if (this.votes.length === 0) {
      return null;
    }
    let modeMap = {};
    let maxEl = this.votes[0];
    let maxCount = 1;
    for (let i = 0; i < this.votes.length; i++) {
      let el = this.votes[i];
      if (modeMap[el] == null) {
        modeMap[el] = 1;
      } else {
        modeMap[el]++;
      }
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    this.roomService
      .addResult(this.roomId, maxEl)
      .then(room => this.router.navigate(['room/' + this.roomId + '/voting/result']));
  }

  viewResult() {
    this.getWinner();
  }

  goBack() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.roomService
      .getRoomById(this.roomId)
      .then(room => {
        this.roomUsersCount = room.users.length;
        this.votes = room.votes;
      });
  }

}
