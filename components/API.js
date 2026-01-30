export default class API {
  constructor({ baseURL, token }) {
    this._baseURL = baseURL;
    this._token = token;
  }

  getUserData() {
    return fetch(this._baseURL + `/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return res.json();
    });
  }

  getCardsData() {
    return fetch(this._baseURL + `/cards/`, {
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

  patchUserData() {
    return fetch(this._baseURL + `/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Maggie Skłodowska Curie",
        about: "Física y Química",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  postCardData(data) {
    return fetch(this._baseURL + `/cards/`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
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
