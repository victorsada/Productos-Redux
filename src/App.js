import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Header />
          <div className="container mt-5">
            {/*Lo que esta fuera del Switch se vera siempre, lo que esta dentro del switch son las 
          redirecciones de las paginas, por lo tanto, el Header estara disponible en todas las paginas */}
            <Switch>
              <Route exact path="/" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route
                exact
                path="/productos/editar/:id"
                component={EditarProducto}
              />
            </Switch>
          </div>
        </Provider>
      </Router>
    </div>
  );
}

export default App;

//Para correr json server, abrir una terminal nueva y colocar el siguiente comando:
//json-server (nombre del archivo.extension) --port (numero de puerto.) por defecto corre en el 3000
//json-server db.json --port 4000
