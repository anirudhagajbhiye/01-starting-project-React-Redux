import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import { cartSliceActions } from "../store/cart-slice";
import classes from "./ProductItem.module.css";

function ProductItem(props) {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button
            onClick={async () => {
              const respone = await fetch(
                `http://localhost:8765/api/carts.json`,
                {
                  method: "POST",

                  body: JSON.stringify({
                    total: 1 * price,
                    quantity: 1,
                    product_id: id,
                    price: price,
                  }),

                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                }
              );
              const responseJson = await respone.json();

              console.log(responseJson);

              dispatch(
                cartSliceActions.add({
                  id: responseJson.data.id,
                  title: title,
                  price: price,
                  total: 1 * price,
                  quantity: 1,
                  product: { name: title },
                })
              );
            }}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
