import { useState, useEffect } from 'react';
import { ProductDetails } from '../components/ProductDetails/ProductDetails';
import { useParams } from 'react-router-dom';
import { apiGet } from '../utils/api';

export const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    apiGet(`products/${productId}`)
    .then(data => {
      setProduct(data);
    });
  }
, [productId])


  if (isLoading) return <Text>Loading...</Text>

  return <ProductDetails product={product} />
}