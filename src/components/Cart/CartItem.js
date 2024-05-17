import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartSliceActions } from "../store/cart-slice";

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button
            onClick={async () => {
              const respone = await fetch(
                `http://localhost:8765/api/carts/${id}.json`,
                {
                  method: "PUT",

                  body: JSON.stringify({
                    quantity: quantity - 1,
                    total: total - price,
                  }),

                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                }
              );
              const responseJson = await respone.json();

              console.log(responseJson);

              if (quantity - 1 == 0) {
                const responeDelete = await fetch(
                  `http://localhost:8765/api/carts/${id}.json`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                    },
                  }
                );
                const responseDeleteJson = await responeDelete.json();

                console.log(responseDeleteJson);
              }

              dispatch(cartSliceActions.decreaseItem(id));
            }}
          >
            -
          </button>
          <button
            onClick={async () => {
              const respone = await fetch(
                `http://localhost:8765/api/carts/${id}.json`,
                {
                  method: "PUT",

                  body: JSON.stringify({
                    quantity: quantity + 1,
                    total: total + price,
                  }),

                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                }
              );
              const responseJson = await respone.json();

              console.log(responseJson);
              dispatch(cartSliceActions.increaseItem(id));
            }}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
