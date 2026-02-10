export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; //encargado de crear y renderizar los datos de una página
    this._container = containerSelector; //selector CSS del contenedor donde se van a agregar los elementos
  }

  addItem(item) {
    this._container.prepend(item);
  }

  _clear() {
    this._container.innerHTML = "";
  }

  rendererItems(items) {
    this._clear();

    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
