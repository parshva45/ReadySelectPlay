import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomServiceClient} from '../services/room.service.client';
import {GameServiceClient} from '../services/game.service.client';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private roomService: RoomServiceClient,
              private gameService: GameServiceClient,
              private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => this.getRoomById(params['roomId']));
  }

  roomId = '';
  games = [];
  filteredGames = [];
  filterOpened = '';
  opened = false;
  noOfFilters = null;
  complexities = ['Light', 'Medium Light', 'Medium', 'Medium Heavy', 'Heavy'];
  categories = ['Abstract Strategy', 'Adventure', 'Animals', 'Bluffing', 'Card Game', 'Children\'s Game', 'Deduction', 'Dice', 'Economic',
    'Educational', 'Fantasy', 'Fighting', 'Horror', 'Maze', 'Medieval', 'Number', 'Racing', 'Science Fiction', 'Territory Building'];
  mechanics = ['Acting', 'Action / Movement Programming', 'Action Point Allowance System',
    'Area Control / Area Influence', 'Area Enclosure', 'Area Movement', 'Area-Impulse', 'Auction/Bidding',
    'Betting/Wagering', 'Campaign / Battle Card Driven', 'Card Drafting', 'Chit-Pull System',
    'Commodity Speculation', 'Cooperative Play', 'Crayon Rail System', 'Deck / Pool Building',
    'Dice Rolling', 'Grid Movement', 'Hand Management', 'Hex-and-Counter', 'Line Drawing', 'Memory',
    'Modular Board', 'Paper-and-Pencil', 'Partnerships', 'Pattern Building', 'Pattern Recognition',
    'Pick-up and Deliver', 'Player Elimination', 'Point to Point Movement', 'Press Your Luck',
    'Rock-Paper-Scissors', 'Role Playing', 'Roll / Spin and Move', 'Rondel', 'Route/Network Building',
    'Secret Unit Deployment', 'Set Collection', 'Simulation', 'Simultaneous Action Selection', 'Singing',
    'Stock Holding', 'Storytelling', 'Take That', 'Tile Placement', 'Time Track', 'Trading', 'Trick-taking',
    'Variable Phase Order', 'Variable Player Powers', 'Voting', 'Worker Placement'];
  appliedFilters = {
    noOfPlayers: null,
    minDuration: null,
    maxDuration: null,
    complexities: [...this.complexities],
    categories: [],
    mechanics: []
  };

  getRoomById(roomId) {
    this.roomId = roomId;
    this.roomService
      .getRoomById(roomId)
      .then(room => {
        this.getGames(room.games);
        if (room.appliedFilters !== null && room.appliedFilters !== {}) {
          this.appliedFilters = room.appliedFilters;
        }
      });
  }

  getGames(gameIds) {
    gameIds.forEach(gameId => {
      this.gameService
        .getGameById(gameId)
        .then(game => {
          this.games.push(game);
          if (this.games.length === gameIds.length) {
            this.games.sort((a, b) => {
              const textA = a.name.toUpperCase();
              const textB = b.name.toUpperCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            // this.filteredGames = this.games;
            this.applyFilters();
          }
        });
    });
  }

  goToGameDetails(gameId) {
    this.router.navigate(['room/' + this.roomId + '/game/' + gameId]);
  }

  updateFilterOpened(filterSelected) {
    this.filterOpened = this.filterOpened === filterSelected ? '' : filterSelected;
  }

  updateAppliedComplexities(complexity) {
    const index = this.appliedFilters.complexities.indexOf(complexity);
    if (index > -1) {
      this.appliedFilters.complexities.splice(index, 1);
    } else {
      this.appliedFilters.complexities.push(complexity);
    }
    this.applyFilters();
  }

  updateAppliedCategories(category) {
    const index = this.appliedFilters.categories.indexOf(category);
    if (index > -1) {
      this.appliedFilters.categories.splice(index, 1);
    } else {
      this.appliedFilters.categories.push(category);
    }
    this.applyFilters();
  }

  updateAppliedMechanics(mechanic) {
    const index = this.appliedFilters.mechanics.indexOf(mechanic);
    if (index > -1) {
      this.appliedFilters.mechanics.splice(index, 1);
    } else {
      this.appliedFilters.mechanics.push(mechanic);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.roomService
      .setFilters(this.roomId, {filters: this.appliedFilters});
    this.countFilters();
    this.filteredGames = this.games.filter(game => {
      const noOfPlayersFilter = !this.appliedFilters.noOfPlayers || this.appliedFilters.noOfPlayers &&
        game.minPlayers <= this.appliedFilters.noOfPlayers && this.appliedFilters.noOfPlayers <= game.maxPlayers;
      const minDurationFilter = !this.appliedFilters.minDuration || this.appliedFilters.minDuration &&
        game.playingTime >= this.appliedFilters.minDuration;
      const maxDurationFilter = !this.appliedFilters.maxDuration || this.appliedFilters.maxDuration &&
        game.playingTime <= this.appliedFilters.maxDuration;
      const complexityFilter = this.appliedFilters.complexities.indexOf(game.complexity) > -1;
      const categoryFilter = this.appliedFilters.categories.length === 0 || this.appliedFilters.categories.length > 0 &&
        this.appliedFilters.categories.indexOf(game.category) > -1;
      const mechanicsFilter = !this.appliedFilters.mechanics || this.appliedFilters.mechanics.length === 0 ||
        this.appliedFilters.mechanics.length > 0 && this.appliedFilters.mechanics.some(mechanic => game.mechanics.includes(mechanic));
      return noOfPlayersFilter && minDurationFilter && maxDurationFilter && complexityFilter && categoryFilter && mechanicsFilter;
    });
  }

  countFilters() {
    let count = 0;
    if (this.appliedFilters.noOfPlayers) {
      count++;
    }
    if (this.appliedFilters.minDuration || this.appliedFilters.maxDuration) {
      count++;
    }
    if (this.appliedFilters.complexities.length !== 5) {
      count++;
    }
    if (this.appliedFilters.categories.length > 0) {
      count++;
    }
    if (this.appliedFilters.mechanics.length > 0) {
      count++;
    }
    this.noOfFilters = count > 0 ? count : null;
  }

  initializeVoting() {
    if (this.filteredGames.length === 0) {
      this.snackBar.open('At least one game should be present!', null, {
        duration: 2000,
        panelClass: ['snackbar-position'],
        verticalPosition: 'bottom'
      });
    } else {
      const filteredGamesIds = [];
      this.filteredGames.forEach(function (game) {
        filteredGamesIds.push(game.gameId);
      });

      const newRoom = {
        filteredGames: filteredGamesIds,
        isVotingInProgress: true
      };
      this.roomService
        .initializeVoting(newRoom, this.roomId)
        .then((res) => {
          // console.log(res);
          // alert('Go to voting screen!');
          this.router.navigate(['room/' + this.roomId + '/voting']);
        });
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
  }

}
