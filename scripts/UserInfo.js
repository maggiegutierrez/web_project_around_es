export default class UserInfo {
  constructor({ userSelector, descriptionSelector }) {
    this._user = userSelector;
    this._description = descriptionSelector;
  }

  getUserInfo() {
    //devuelve un objeto con información sobre el usuario
  }

  setUserInfo() {
    //Toma los datos del getUserInfo() y los inserta en el DOM
  }
}
