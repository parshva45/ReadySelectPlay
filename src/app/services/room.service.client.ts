export class RoomServiceClient {

  LOCAL_URL = 'http://localhost:4000';

  VARIABLE_URL = this.LOCAL_URL;

  ROOM_URL = this.VARIABLE_URL + '/api/room';

  setName(roomId, name) {
    return fetch(this.ROOM_URL + '/' + roomId + '/name', {
      body: JSON.stringify(name),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  setFilters(roomId, filters) {
    return fetch(this.ROOM_URL + '/' + roomId + '/filters', {
      body: JSON.stringify(filters),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  addUser(roomId, userId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/user/add', {
      body: JSON.stringify({userId}),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  removeUser(roomId, userId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/user/remove', {
      body: JSON.stringify({userId}),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  addGame(roomId, gameId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/game/add', {
      body: JSON.stringify({gameId}),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  removeGame(roomId, gameId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/game/remove', {
      body: JSON.stringify({gameId}),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  getRoomResult(roomId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/result')
      .then(response => response.json());
  }

  addResult(roomId, gameId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/result/add', {
      body: JSON.stringify({gameId}),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  getAllRooms() {
    return fetch(this.ROOM_URL)
      .then(response => response.json());
  }

  getRoomById(roomId) {
    return fetch(this.ROOM_URL + '/' + roomId)
      .then(response => response.json());
  }

  initializeVoting(newRoom, roomId) {
    return fetch(this.ROOM_URL + '/' + roomId, {
      body: JSON.stringify(newRoom),
      method: 'put',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  createRoom() {
    const room = {
      name: 'Draft Room',
      games: [],
      users: ['5c8192f0ac8404a74c00a083'],
      isVotingInProgress: false,
      results: [],
      filteredGames: [],
      appliedFilters: {
        noOfPlayers: null,
        minDuration: null,
        maxDuration: null,
        complexities: ['Light', 'Medium Light', 'Medium', 'Medium Heavy', 'Heavy'],
        categories: [],
        mechanics: [],
      }
    };

    return fetch(this.ROOM_URL, {
      body: JSON.stringify(room),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

}
