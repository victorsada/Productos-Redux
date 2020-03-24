import React, { useState } from "react";
import { crearNuevoProductoAction } from "../action/productoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../action/alertaAction";
import { useDispatch, useSelector } from "react-redux";

const NuevoProducto = ({ history }) => {
  const dispatch = useDispatch(); // useDispatch para poder invocar las funciones de los action
  //acceder al state del store. Eso con useSelector

  const cargando = useSelector(state => state.productos.loading);
  const alertastate = useSelector(state => state.alerta.alerta);

  const error = useSelector(state => {
    return state.productos.error;
  });

  const agregarProducto = producto => {
    //mandar a llamar el action de producto a traves del dispatch
    dispatch(crearNuevoProductoAction(producto));
  };
  //state local del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  const submitNuevoProducto = e => {
    e.preventDefault();
    //validar formulario
    const alerta = {
      msg: "Todos los campos son obligatorios",
      classes: "alert alert-danger text-center text-uppercase p3"
    };
    if (nombre.trim() === "" || precio <= 0) {
      dispatch(mostrarAlerta(alerta));

      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());
    //crear nuevo producto
    agregarProducto({ nombre, precio });
    //Redireccionar
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alertastate ? (
              <p className={alertastate.classes}> {alertastate.msg} </p>
            ) : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre del Producto: </label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio del Producto: </label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando..</p> : null}
            {error ? (
              <p className="alert alert-danger p2 text-center mt-4 ">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
