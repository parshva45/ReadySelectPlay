export class RoomServiceClient {

  LOCAL_URL = 'http://localhost:4000';

  VARIABLE_URL = this.LOCAL_URL;

  ROOM_URL = this.VARIABLE_URL + '/api/room';

  getRoomResult(roomId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/result')
      .then(response => response.json());
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

}
