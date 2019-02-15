export class GameServiceClient {

  LOCAL_URL = 'http://localhost:4000';
  // REMOTE_URL = 'https://eze-cuisine-nodejs-server.herokuapp.com';

  VARIABLE_URL = this.LOCAL_URL;

  GAME_URL = this.VARIABLE_URL + '/api/game';

  getAllGames() {
    return fetch(this.GAME_URL)
      .then(response => response.json());
  }
}
