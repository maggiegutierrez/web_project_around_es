export default class API {
  constructor({ baseURL, token }) {
    this._baseURL = baseURL;
    this._token = token;
  }

  async cardsData() {
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
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Física y Química",
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }
}

const api = new API({
  baseURL: "https://around-api.es.tripleten-services.com/v1",
  token: "98bc7c1d-eb51-4075-89db-ccaa5c9b5069",
});

export { api };
