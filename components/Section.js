export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //array de datos iniciales
    this._renderer = renderer; //encargado de crear y renderizar los datos de una página
    this._container = document.querySelector(containerSelector); //selector CSS del contenedor donde se van a agregar los elementos
  }

  addItem(item) {
    this._container.append(item);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderer() {
    this._clear();

    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
