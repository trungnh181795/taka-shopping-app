import { useState, useEffect } from 'react';

import "./QuantityInput.scss";

const QuantityInput = ({ defaultValue, onInputChange }) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const numberRegex = /^\d*$/;

  useEffect(() => {
    onInputChange(inputValue);
  }, [inputValue])

  return (
    <div className="product-quantity d-flex">
      <button
        className="product-quantity-btn"
        onClick={() => setInputValue((prev) => (prev === 1 ? 1 : prev - 1))}
        name="decrease"
      >
        -
      </button>
      <input
        className="product-quantity-input text-center taka-text-sm-normal"
        name="modify"
        value={inputValue}
        onChange={(e) => {
            let input = e.target.value;
            return setInputValue((prev) =>
              numberRegex.test(input) && input >= 1 ? input : prev
            )
        }}
      />
      <button
        className="product-quantity-btn"
        onClick={() => setInputValue((prev) => prev + 1)}
        name="increase"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
