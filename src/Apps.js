import React, { useEffect, useState } from "react";

const Apps = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("black");

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    setColor("red");
  });

  return (
    <div>
      <div style={{ color: color, fontSize: "50px" }}>
        {count}
        <button onClick={incrementCount}>Increment</button>
        <button onClick={decrementCount}>Decrement</button>
      </div>
    </div>
  );
};

export default Apps;
