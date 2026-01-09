export default class UserInfo {
  constructor(user) {
    this._user = user.profileTitle;
    this._description = user.profileDescription;
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
