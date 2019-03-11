import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.css']
})
export class VotingResultComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
