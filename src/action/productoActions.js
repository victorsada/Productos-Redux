import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  COMENZAR_EDICION_PRODUCTO
} from "../types";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async dispatch => {
    dispatch(agregarProducto());
    try {
      //Insertar en la API
      await clienteAxios.post("/productos", producto);
      //actualiza el state
      dispatch(agregarProductoExito(producto));
      Swal.fire("Correcto", "El producto se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo"
      });
    }
  };
}

const agregarProducto = () => ({
  //todo lo que este dentro de este parentesis "el de arriba" es el action.
  type: AGREGAR_PRODUCTO,
  payload: true
});

const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});
const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Obtener productos
export function obtenerProductosAction() {
  return async dispatch => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error);
      dispatch(descargaProctosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
});

const descargaProductosExitosa = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

const descargaProctosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Eliminar un producto

export function borrarProductosAction(id) {
  return async dispatch => {
    dispatch(obtenerProductoEliminar(id));

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
      //Si se elimina, mostrar alerta de producto eliminado
      Swal.fire(
        "Eliminado",
        "El producto ha sido Eliminado satisfactoriamente",
        "success"
      );
    } catch (error) {
      dispatch(eliminarProductoError());
      console.log(error);
    }
  };
}

const obtenerProductoEliminar = id => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function obtenerProductoEditar(producto) {
  return dispatch => {
    dispatch(obtenerProductoEditarAction(producto));
  };
}

const obtenerProductoEditarAction = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function editarProductoAction(producto) {
  return async dispatch => {
    dispatch(editarProducto());

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);

      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error);
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO
});

const editarProductoExito = producto => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
});
