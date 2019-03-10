import { Component, OnInit } from '@angular/core';
// import { FilterPipe } from './filter.pipe';
// import pp = jasmine.pp;
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private userService: UserServiceClient) { }
  people = [];
  selected = [];
  select(ppl) {
    for (let i = 0; i < this.people.length; i++ ) {
      if (this.people[i]._id === ppl._id) {
        this.people.splice(i, 1);
      }
    }
    this.selected.push(ppl);
  }
  unselect(name) {
    for (let i = 0; i < this.selected.length; i++ ) {
      if (this.selected[i]._id === name._id) {
        this.selected.splice(i, 1);
      }
    }
    this.people.push(name);
  }



  ngOnInit() {
    this.userService.getAllUsers()
      .then(response => this.people = response
      );
  }

}
