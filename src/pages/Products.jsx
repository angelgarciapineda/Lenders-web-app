import React from "react";

function Products() {
  return (
    <div className="container col-sm-4">
      <form class="row g-3">
        <div class="col-md-12">
          <label for="inputEmail4" class="form-label">
            Nombre del producto
          </label>
          <input type="email" class="form-control" id="inputEmail4" />
        </div>
        <div class="col-md-12">
          <label for="formFileMultiple" class="form-label">
            Seleccionar máximo 3 fotos
          </label>
          <input
            class="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Descripción
          </label>
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
          ></textarea>
        </div>
        <div class="col-md-12">
          <label for="inputState" class="form-label">
            Catalogo
          </label>
          <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>Catalogo 1</option>
            <option>Catalogo 2</option>
            <option>Catalogo 3</option>
          </select>
        </div>
        <div class="col-12">
          <button type="button" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Products;
