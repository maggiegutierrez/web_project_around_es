export default class UserInfo {
  constructor(user) {
    this._user = user.profileTitle;
    this._about = user.profileAbout;
    this._avatar = user.profileImage;
  }

  getUserInfo() {
    return {
      name: this._user.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
