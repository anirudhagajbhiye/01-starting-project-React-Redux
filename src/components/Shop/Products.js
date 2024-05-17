import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const temp = await fetch("http://localhost:8765/api/products.json");
    const response = await temp.json();
    console.log(response);

    setProducts(response.data);
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {products.map((item) => {
          return (
            <ProductItem
              title={item.name}
              price={item.price}
              description={item.description}
              id={item.id}
            />
          );
        })}
        {
          <ProductItem
            title="Test"
            price={6}
            description="This is a first product - amazing!"
          />
        }
      </ul>
    </section>
  );
};

export default Products;


