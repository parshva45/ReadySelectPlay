import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private userService: UserServiceClient,
              private roomService: RoomServiceClient,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.route.params.subscribe(params => this.roomId = params['roomId']);
  }

  roomId = '';
  people = [];
  users = [];
  filteredPeople = [];
  searchText = '';
  selected = [];

  search(searchText) {
    searchText = searchText.toLowerCase();
    this.filteredPeople = this.people.filter(user => {
      return (user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)) && this.selected.indexOf(user) === -1;
    });
    this.sortFilteredPeople();
  }

  select(ppl, index) {
    this.roomService
      .addUser(this.roomId, ppl._id)
      .then(response => {
        this.filteredPeople.splice(index, 1);
        this.selected.push(ppl);
        this.sortFilteredPeople();
        this.sortSelectedPeople();
      });
  }

  unselect(name, index) {
    this.roomService
      .removeUser(this.roomId, name._id)
      .then(response => {
        this.selected.splice(index, 1);
        this.filteredPeople.push(name);
        this.sortFilteredPeople();
        this.sortSelectedPeople();
      });
  }

  goBack() {
    this.location.back();
  }

  next() {
    this.router.navigate(['room/' + this.roomId + '/games']);
  }

  sortFilteredPeople() {
    this.filteredPeople.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  sortSelectedPeople() {
    this.selected.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }

  ngOnInit() {
    this.roomService
      .getRoomById(this.roomId)
      .then(room => {
        this.users = room.users;
        this.userService.getAllUsers()
          .then(response => {
            response.forEach(user => {
              this.people.push(user);
              if (this.users.indexOf(user._id) > -1) {
                this.selected.push(user);
                this.sortSelectedPeople();
              } else {
                this.filteredPeople.push(user);
                this.sortFilteredPeople();
              }
            });
            }
          );
      });
  }

}
