export class RoomServiceClient {

  LOCAL_URL = 'http://localhost:4000';

  VARIABLE_URL = this.LOCAL_URL;

  ROOM_URL = this.VARIABLE_URL + '/api/room';

  getRoomResult(roomId) {
    return fetch(this.ROOM_URL + '/' + roomId + '/result')
      .then(response => response.json());
  }

}
