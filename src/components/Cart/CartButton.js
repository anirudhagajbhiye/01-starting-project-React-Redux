import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiSliceActions } from "../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.cart.items.length);
  const totalCost = useSelector((state) => state.cart.totalCost);
  return (
    <button
      className={classes.button}
      onClick={() => {
        dispatch(uiSliceActions.toggle());
      }}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
      <span className={classes.badge}>${totalCost}</span>
    </button>
  );
};

export default CartButton;
