import {Component, OnInit} from '@angular/core';
// import { FilterPipe } from './filter.pipe';
// import pp = jasmine.pp;
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private userService: UserServiceClient) {
  }

  people = [];
  filteredPeople = [];
  searchText = '';
  selected = [];

  search(searchText) {
    searchText = searchText.toLowerCase();
    this.filteredPeople = this.people.filter(user => {
      return (user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText)) && this.selected.indexOf(user) === -1;
    });
  }

  select(ppl, index) {
    this.filteredPeople.splice(index, 1);
    // for (let i = 0; i < this.people.length; i++ ) {
    //   if (this.people[i]._id === ppl._id) {
    //     this.people.splice(i, 1);
    //   }
    // }
    this.selected.push(ppl);
  }

  unselect(name, index) {
    this.selected.splice(index, 1);
    // for (let i = 0; i < this.selected.length; i++ ) {
    //   if (this.selected[i]._id === name._id) {
    //     this.selected.splice(i, 1);
    //   }
    // }
    this.filteredPeople.push(name);
  }


  ngOnInit() {
    this.userService.getAllUsers()
      .then(response => {
          this.people = response;
          this.filteredPeople = response;
        }
      );
  }

}
