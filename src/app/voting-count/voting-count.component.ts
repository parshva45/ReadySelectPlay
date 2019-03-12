import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-voting-count',
  templateUrl: './voting-count.component.html',
  styleUrls: ['./voting-count.component.css']
})
export class VotingCountComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }

  roomId = '';

  viewResult() {
    this.router.navigate(['room/' + this.roomId + '/voting/result']);
  }

  goBack() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
  }

}
