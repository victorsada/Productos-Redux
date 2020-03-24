import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //permite usar funciones asincronas, entre otras vetajas
import reducer from "./reducers";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk), //si no usaramos thunk tampoco el applyMiddleware

    // El codigo de abajo hace que el proyecto pueda correr en un navegador que no tenga redux habilitado
    typeof window === "object" &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
    // El codigo de arriba hace que el proyecto pueda correr en un navegador que no tenga redux habilitado
  )
);

export default store;
