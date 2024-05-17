import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { cartSliceActions } from "../store/cart-slice";

const Cart = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const temp = await fetch("http://localhost:8765/api/carts.json");
    const response = await temp.json();
    console.log(response);

    dispatch(cartSliceActions.updateItemFromServer(response.data));
  };

  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              item={{
                id: item.id,
                title: item.product.name,
                quantity: item.quantity,
                total: item.total,
                price: item.price,
              }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
