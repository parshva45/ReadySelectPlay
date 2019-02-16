export class GameServiceClient {

  LOCAL_URL = 'http://localhost:4000';
  // REMOTE_URL = 'https://eze-cuisine-nodejs-server.herokuapp.com';

  VARIABLE_URL = this.LOCAL_URL;

  GAME_URL = this.VARIABLE_URL + '/api/game';

  getAllGames() {
    return fetch(this.GAME_URL)
      .then(response => response.json());
  }

  getBgg(i) {
    return fetch('https://bgg-json.azurewebsites.net/thing/' + i)
      .then(response => response.json());
  }

  createGame(game) {
    return fetch(this.GAME_URL, {
      body: JSON.stringify(game),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors'
    }).then(response => response.json());
  }

}
