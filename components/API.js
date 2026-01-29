export default class API {
  constructor({ baseURL, token }) {
    this._baseURL = baseURL;
    this._token = token;
  }

  async cardsData() {
    console.log(this._baseURL);
    return fetch(this._baseURL + `/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }

  async userData() {
    return fetch(this._baseURL + `/users/me`, {
      headers: {
        method: "PATCH",
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }
}

export const api = new API({
  baseURL: "https://around-api.es.tripleten-services.com/v1",
  token: "98bc7c1d-eb51-4075-89db-ccaa5c9b5069",
});
