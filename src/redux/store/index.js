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

import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers";

// la funzione configureStore si occuperà di creare lo Store grazie al fatto che è già configurata per ritornare l'oggetto di Stato globale
// la importiamo dal pacchetto reduxjs/toolkit e internamente avrà delle logiche aggiuntive rispetto ad un createStore usato in passato
// configurerà anche i redux developer tools, oltre che a dei comodi "middlewares" per includere operazioni come fetch nel flusso redux
const store = configureStore({
  // dobbiamo fornire il nostro reducer associato alla proprietà reducer
  reducer: mainReducer
});

export default store;
