import React from "react";
import { useHistory } from "react-router-dom";
import {
  borrarProductosAction,
  obtenerProductoEditar
} from "../action/productoActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const confirmarEliminarProducto = id => {
    //preguntar al usuario

    Swal.fire({
      title: "¿Estas seguro que deseas eliminar este producto?",
      text: "¡El resultado es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, bórralo.",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        //pasarlo al action
        dispatch(borrarProductosAction(id));
      }
    });
  };

  //funcion que redirije de forma programada
  const redireccionarEdicion = producto => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold">$ {producto.precio}</span>
      </td>
      <td className="acciones">
        <button
          type="submit"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => confirmarEliminarProducto(producto.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
