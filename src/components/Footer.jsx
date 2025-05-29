import { Component } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { ADD_TO_CART, SET_USER, setUserAction } from "../redux/action";
// la funzione connect è una funzione di alto livello HOF - Higher Order Function, che connette il nostro Class Component allo Store
// questa funzione vuole due parametri (mapStateToProps, mapDispatchToProps)

// questi due parametri "mapperanno" (applicheranno) delle prop sul componente a classe
// che avrà quindi facoltà di leggere i dati dello stato tramite le sue props, e sempre dalle props avrà accesso alla funzione dispatch
// per effettuare dei cambi di stato

// 1) definiamo mapStateToProps
const mapStateToProps = state => {
  // questa funzione viene chiamata internamente alla connect() al momento dell'export del componente
  // si occuperà di estrarre i valori dallo state (Redux Store) che ci interessano e li applicherà (mapperà) sulle props

  // le proprietà che creiamo in questo oggetto ritornato, diventeranno le prop del componente
  return {
    user: state.user.content,
    cartLength: state.cart.content.length,
    bookSelected: state.bookSelected.content,
    books: state.books.content
  };
};

// 2) definiamo mapDispatchToProps
const mapDispatchToProps = dispatch => {
  // questa funzione ci regala la funzione dispatch come parametro, datoci dalla connect

  // anche da qui ritorneremo un oggetto che definisce dei nomi di prop che poi verranno applicate (mappate) sul componente
  // occorrerà inserire la dispatch in un'altra definizione di funzione, per evitare che questa si esegua subito al momento della creazione della funzione mapDispatchToProps
  // quindi per eseguire una dispatch andremo a chiamare la prop setUser
  // se avessimo bisogno di rendere più dinamico il payload sarebbe necessario definire la funzione nella prop con un parametro,
  // così da poter decidere, al momento della chiamata della prop che valore passarle
  return {
    // setUser: name => dispatch({ type: SET_USER, payload: name }),
    // addToCart: book => dispatch({ type: ADD_TO_CART, payload: book })
    addToCart: book => dispatch(addToCartAction(book)),
    setUser: name => dispatch(setUserAction(inputValue))
  };
};

class Footer extends Component {
  render() {
    // le prop user, cartLength, bookSelected sono state estratte dal mapStateToProps e applicate al componente dalla funzione connect
    const { user, books, cartLength, bookSelected, setUser, addToCart } = this.props;

    return (
      <footer className="epizon-footer">
        <span className="text-muted">Epizon {new Date().getFullYear()}©</span> <span>Bentornato, {user}</span>
        <p>
          Il carrello contiene {cartLength} element{cartLength > 1 ? "i" : "o"}
        </p>
        {bookSelected && <p>Il libro selezionato è {bookSelected.title}</p>}
        <Button variant="warning" onClick={() => setUser("Stefano")}>
          Set User
        </Button>
        {bookSelected && (
          <Button variant="primary" onClick={() => addToCart(bookSelected)}>
            Add To Cart
          </Button>
        )}
        <ListGroup>
          {books.map(book => (
            <ListGroup.Item key={book.id}>{book.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </footer>
    );
  }
}

// qui sotto avvengono 3 passaggi,
// prima si risolve connect,
// poi una seconda operazione che prende Footer come argomento,
// e poi il footer viene esportato, già aumentato nei dati (nelle props)
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
