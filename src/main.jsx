import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/index.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  // Provider è un HOC - Higher Order Component, che riceve lo stato globale (Store) importandolo dal file store/index.js
  // e si occuperà di gestire le dinamiche interne ai componenti, che tramite hooks si collegheranno direttamente a lui
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
