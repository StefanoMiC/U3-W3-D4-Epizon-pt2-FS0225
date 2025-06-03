// Questo file si occuperà di creare il nostro Redux Store all'avvio dell'applicazione

// installa i pacchetti necessari:
// npm i @reduxjs/toolkit react-redux

// PASSAGGI DA ESEGUIRE PER IMPOSTARE UN REDUX STORE:

// 1) crea lo store con il configureStore
// 2) crea un reducer con un primo case e un default case e applicagli lo stato iniziale (per il primo avvio)
// 3) collega lo store all'App React tramite il <Provider> e la prop store in main.jsx

// 4) a questo punto sei pronto per usare l'hook useDispatch per ricavare al funzione dispatch() ed
//    eseguirla inserendo un'oggetto action come argomento
// 5) potrai leggere da qualsiasi punto dell'applicazione il dato (che cambia nel tempo) tramite l'hook useSelector

import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import mainReducer from "../reducers";
import cartReducer from "../reducers/cartReducer";
import bookSelectedReducer from "../reducers/bookSelectedReducer";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";
import errorReducer from "../reducers/errorReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_KEY
    })
  ]
};

const rootReducer = combineReducers({
  cart: cartReducer,
  bookSelected: bookSelectedReducer,
  user: userReducer,
  books: booksReducer,
  error: errorReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// la funzione configureStore si occuperà di creare lo Store grazie al fatto che è già configurata per ritornare l'oggetto di Stato globale
// la importiamo dal pacchetto reduxjs/toolkit e internamente avrà delle logiche aggiuntive rispetto ad un createStore usato in passato
// configurerà anche i redux developer tools, oltre che a dei comodi "middlewares" per includere operazioni come fetch nel flusso redux
export const store = configureStore({
  // dobbiamo fornire il nostro reducer associato alla proprietà reducer
  // reducer: mainReducer // Ora non abbiamo più un singolo reducer, ma più reducer che gestiscono ognuno la propria fetta (slice) di stato
  // che vengono riunificati in un unico oggetto nel rootReducer grazie anche a combineReducers()
  // reducer: rootReducer
  // siccome ora stiamo usando redux-persist useremo il suo reducer "aumentato"
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) // spegne il fastidioso warning sui non serializable values
});

export const persistor = persistStore(store);
