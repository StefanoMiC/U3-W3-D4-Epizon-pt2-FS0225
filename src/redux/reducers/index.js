// Questo sarà il nostro primo Reducer! (l'ufficio postale che smista le lettere)
// un reducer dev'essere una funzione PURA! che prenda lo STATO CORRENTE nel momento immediatamente succesivo alla dispatch con l'action inviata
// e con la nuova informazione contenuta nell'action creerà SEMPRE un NUOVO STATO (senza incertezze o ambiguità)

// OGNI VOLTA che verrà "risvegliato" (per via della chiamata di dispatch) leggerà dal suo secondo parametro la nostra action con il suo type (il type è obbligatorio che ci sia sempre)
// oltre al type potrebbe esserci un payload dal quale derivare il nuovo dato da salvare con il quale si genererà il nuovo Stato dell'applicativo

// da dove cominciare?
// si comincia con il creare uno stato iniziale (default) per il primo avvio dell'applicazione

const initialState = {
  cart: {
    createdAt: new Date().toISOString(),
    content: [] // questo ci rappresenta il contenuto, ora vuoto, del carrello. acquisirà elementi libro dopo ogni cambio di stato (dispatch + action)
  },
  bookSelected: {
    content: null
  },
  user: {
    content: ""
  }
};

// questo stato sarà la condizione iniziale del nostro Store dopo OGNI REFRESH (rappresenta la condizione iniziale dello stato dell'intera App)

// potremo modificarlo seguendo il principio dell'IMMUTABILITA' - fornendo SEMPRE un NUOVO OGGETTO nella sua interezza dal nostro reducer

// il reduce è una funzione PURA e quindi non modifica/manipola MAI direttamente i suoi dati (parametri state e action), li legge solamente!
// e li utilizza per generare il nuovo oggetto di stato.

// in base a delle operazioni matematiche prevedibili computerà il NUOVO STATO di ritorno dai suoi "case"
// questo nuovo oggetto di stato ritornato rapprenta A TUTTI GLI EFFETTI il nuovo STORE AGGIRONATO!

// l'initialState che abbiamo creato come prima cosa, dovremo fornirlo come valore iniziale di default del primo parametro state

const mainReducer = (state = initialState, action) => {
  // qui dentro IN OGNI CASO o SITUAZIONE si dovrà PER FORZA ritornare UN NUOVO STATO. Nella peggiore delle ipotesi ritorneremo lo stato nella condizione precedente.
  // ma un qualche oggetto di stato dovrà sempre essere ritornato dopo l'avvio di questa funzione.
  // Bisogna evitare a tutti i costi che da qui venga ritornato un undefined.

  // per fare ciò creeremo uno switch case con default che farà il return dello stato attuale (senza modifiche), in modo da rispettare le regole appena descritte
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          //   è importante ricordarsi che queste operazioni NON DEVONO mutare i dati originali, devono SEMPRE creare nuove entità,
          // in questo caso un NUOVO ARRAY, sfruttando metodi che NON MUTANO l'originale, ma ritornano sempre un NUOVO ARRAY
          // content: state.cart.content.push(action.payload) ❌
          // content: state.cart.content.concat(action.payload)✅
          content: [...state.cart.content, action.payload] // ✅
        }
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          //   è importante ricordarsi che queste operazioni NON DEVONO mutare i dati originali, devono SEMPRE creare nuove entità,
          // in questo caso un NUOVO ARRAY, sfruttando metodi che NON MUTANO l'originale, ma ritornano sempre un NUOVO ARRAY

          //   content: state.cart.content.slice(0, action.payload).concat(state.cart.content.slice(action.payload + 1)) // ✅
          //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)] // ✅
          //   content: state.cart.content.splice(action.payload, 1) // ❌ lo splice ritorna un array con gli elementi eliminati,
          //    ci troveremmo ad avere l'opposto di quello che ci interessa, oltre ad aver MUTATO l'array nello stato
          content: state.cart.content.filter((_, i) => i !== action.payload) // ✅
        }
      };

    case "SELECT_BOOK":
      return {
        ...state,
        bookSelected: {
          ...state.bookSelected,
          content: action.payload
        }
      };

    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          content: action.payload
        }
      };

    default:
      // stiamo tornando un oggetto nel caso in cui non si sia attivato nessun case precedente
      console.log("DEFAULT");
      return state;
  }
};

export default mainReducer;
