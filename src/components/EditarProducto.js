import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editarProductoAction } from "../action/productoActions";
import { useHistory } from "react-router-dom";

const EditarProducto = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //nuevo state de producto
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  });
  //producto a editar
  const productoEditar = useSelector(state => state.productos.productoeditar);

  //Llenar el state automaticamente
  useEffect(() => {
    guardarProducto(productoEditar); //ponemos en el state actual el producto a editar
  }, [productoEditar]);

  if (!productoEditar) return null;
  //leer los datos del formulario
  const onChangeFormulario = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const submitEditarProducto = e => {
    e.preventDefault();
    //mandar al action
    dispatch(editarProductoAction(producto));
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre del Producto: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del producto"
                  name="nombre"
                  value={producto.nombre}
                  onChange={onChangeFormulario}
                />
              </div>

              <div className="form-group">
                <label>Precio del Producto: </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del producto"
                  name="precio"
                  value={producto.precio}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
