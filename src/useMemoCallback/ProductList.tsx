import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [cart, setCart] = useState<number[]>([]);

  // 🔹 1. Expensive computation: filter products
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p => p.price >= minPrice);
  }, [products, minPrice]);

  // 🔹 2. Stable callback: add to cart
  const handleAddToCart = useCallback((id: number) => {
    setCart(prev => [...prev, id]);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        placeholder="Min Price"
      />
      <div>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
