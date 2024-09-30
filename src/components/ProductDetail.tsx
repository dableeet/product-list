import { useState, useEffect, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data: Product[]) => {
        const foundProduct = data.find((item) => item.id === parseInt(id!));

        if (!foundProduct) {
          return;
        }

        setProduct(foundProduct);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-contain mb-4"
      />
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-2xl font-bold mb-4">${product.price}</p>
      <Link to="/" className="text-blue-500 underline">
        Back to Product List
      </Link>
    </div>
  );
};

export default memo(ProductDetail);
