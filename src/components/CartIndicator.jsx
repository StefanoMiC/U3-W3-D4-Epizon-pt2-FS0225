import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartIndicator = () => {
  const [inputValue, setInputValue] = useState("");

  // useSelector è un hook regalatoci dallo Store tramite il Provider
  // ci chidede una funzione di selector (per selezionare quello che ci interessa dallo stato globale)
  // il valore ritornato dalla funzione di selector sarà poi il valore che ricaviamo dall'operazione,
  // quindi lo possiamo salvare in una variabile con un nome coerente col dato ricevuto

  // questa variabile la possiamo trattare come una variabile di stato del classico useState, la possiamo usare direttamente nel JSX!
  const cartLength = useSelector(state => state.cart.content.length);
  const user = useSelector(state => state.user.content);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="ms-auto text-end mt-3 mb-4">
      {user ? (
        <>
          <h4 className="display-6 fs-4 d-inline-block me-2 align-middle">
            Ciao, <strong>{user}</strong>!
          </h4>
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ms-2">{cartLength}</span>
          </Button>
        </>
      ) : (
        <div className="d-flex align-items-center gap-1">
          <FormControl
            type="text"
            placeholder="Inserisci il tuo nome"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
            }}
          />
          <Button className="flex-shrink-0" onClick={() => dispatch({ type: "SET_USER", payload: inputValue })}>
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartIndicator;
