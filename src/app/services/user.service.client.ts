export class UserServiceClient {

  LOCAL_URL = 'http://localhost:4000';

  VARIABLE_URL = this.LOCAL_URL;

  USER_URL = this.VARIABLE_URL + '/api/user';

  getAllUsers() {
    return fetch(this.USER_URL)
      .then(response => response.json());
  }

  getUserById(userId) {
    return fetch(this.USER_URL + '/' + userId)
      .then(response => response.json());
  }

}