export default class UserInfo {
  constructor({ userSelector, descriptionSelector }) {
    this._user = userSelector;
    this._description = descriptionSelector;
  }

  getUserInfo() {
    return {
      name: this._user.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._description.textContent = data.description;
  }
}
