import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Props {
  product: Product;
  onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<Props> = React.memo(({ product, onAddToCart }) => {
  console.log(`Rendering ${product.name}`);

  return (
    <div style={{ border: '1px solid #ccc', padding: '8px', margin: '4px' }}>
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
});

export default ProductCard;
