import { Alert, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, addToCartAction } from "../redux/action";

const BookDetail = () =>
  // { bookSelected }
  {
    // dobbiamo recuperare la funzione dispatch, la possiamo trovare utilizzando l'hook corrispondente => useDispatch()

    // useDispatch in quanto hook va chiamato, e ci fornisce, dalla sua esecuzione, la funzione dispatch.
    // Che sarà quella che potremo utilizzare per avviare le operazioni per un cambio di stato.
    const dispatch = useDispatch();
    const bookSelected = useSelector(state => state.bookSelected.content);
    const user = useSelector(state => state.user.content);
    return (
      <div className="mt-3 mb-4 mb-lg-0">
        {bookSelected ? (
          <>
            <Row>
              <Col sm={12}>
                <h1>{bookSelected.title}</h1>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm={4}>
                <div className="mt-3">
                  <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
                </div>
              </Col>
              <Col sm={8}>
                <p>
                  <span className="font-weight-bold">Description:</span>&nbsp;
                  {bookSelected.description}
                </p>
                <p>
                  <span className="font-weight-bold">Price:</span>&nbsp;
                  {bookSelected.price}€
                </p>
                {user ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      // dispatch è la funzione presa dall'hook useDispatch (vedi sopra)
                      // che avvia il processo di cambio di stato, inviando l'oggetto (ACTION) che inseriamo come suo argomento
                      // dispatch({ type: ADD_TO_CART, payload: bookSelected });
                      dispatch(addToCartAction(bookSelected));
                    }}
                  >
                    ADD TO CART
                  </Button>
                ) : (
                  <Alert variant="warning">Devi loggarti prima di poter inserire elementi nel carrello</Alert>
                )}
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col sm={12}>
              <h3>Start by clicking on a book!</h3>
            </Col>
          </Row>
        )}
      </div>
    );
  };

export default BookDetail;
