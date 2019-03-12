import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css']
})
export class VotingResultComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private roomService: RoomServiceClient,
              private router: Router) {
    this.route.params.subscribe(params => this.getRoomResult(params));
  }

  game = '';
  getRoomResult(params) {
    const roomId = params['roomId'];
    this.roomService.getRoomResult(roomId)
      .then(response => this.game = response
      );
  }

  goBack(){
    this.router.navigate(['home']);
  }


  ngOnInit() {
  }

}
