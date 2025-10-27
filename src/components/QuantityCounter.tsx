import React, { useState } from 'react';

// Define the component with props for min/max values
interface QuantityCounterProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantityCounter = ({
  initialQuantity = 1,
  min = 1,
  max = 10,
  onQuantityChange,
}: QuantityCounterProps) => {

  const [quantity, setQuantity] = useState(initialQuantity);


  const updateQuantity = (newQuantity: number) => {

    const safeQuantity = Math.min(Math.max(newQuantity, min), max);
    
    setQuantity(safeQuantity);
    onQuantityChange(safeQuantity); 
  };


  const handleIncrement = () => {
    updateQuantity(quantity + 1);
  };


  const handleDecrement = () => {
    updateQuantity(quantity - 1);
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      updateQuantity(value);
    } else {
        setQuantity(min);
        onQuantityChange(min);
    }
  };

  return (
    <div className="flex items-center space-x-0.5 border border-gray-300 rounded-lg w-32">
      
      {}
      <button
        onClick={handleDecrement}
        disabled={quantity <= min} 
        className={`px-3 py-2 text-xl font-medium rounded-l-lg transition duration-150 ${
          quantity <= min 
            ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
            : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
        }`}
      >
        −
      </button>

      <input
        type="text" 
        value={quantity}
        onChange={handleInputChange}
        className="w-full text-center text-lg font-semibold border-none focus:ring-0 focus:outline-none"
        aria-label="Item Quantity"
        role="spinbutton"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max} 
        className={`px-3 py-2 text-xl font-medium rounded-r-lg transition duration-150 ${
          quantity >= max 
            ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
            : 'text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100'
        }`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;