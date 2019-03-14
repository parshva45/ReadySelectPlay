import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomServiceClient) {
    this.route.params.subscribe(params => this.getRoomResult(params));
  }

  game = {
    image: '',
    name: ''
  };
  getRoomResult(params) {
    const roomId = params['roomId'];
    this.roomService.getRoomResult(roomId)
      .then(response => this.game = response
      );
  }

  goHome() {
    this.router.navigate(['home']);
  }
  ngOnInit() {
  }

}
