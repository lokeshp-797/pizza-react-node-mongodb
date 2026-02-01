import Pizza from "./Pizza";
import axios from "axios";
import React, { useState, useEffect } from "react";
const url = "http://localhost:3001/api/v1/pizzas";

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [numPizzas, setNumPizzas] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);

      if (response.data && response.data.pizzas) {
        const pizzaArray = response.data.pizzas;
        setNumPizzas(pizzaArray.length);
        setPizzas(pizzaArray);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Ensure loading stops even on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FIXED LOGIC: Show spinner when loading is TRUE
  if (loading) return <h2 className='loader'>Loading menu...</h2>;

  return (
    <main className='menu'>
      <h2>Our Menu</h2>
      {numPizzas > 0 ? (
        <>
          <p>Authentic Indian cuisine. Creative dishes from our stone oven.</p>
          <ul className='pizzas'>
            {pizzas.map((pizza) => (
              // Ensure pizza.name is a primitive (string/number)
              <Pizza pizzaObj={pizza} key={pizza.id || pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
};

export default Menu;
