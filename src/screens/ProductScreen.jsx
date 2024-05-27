import { useState, useEffect } from "react";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { Text } from "@chakra-ui/react";

export const ProductScreen = () => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    apiGet(`products/${productId}`)
      .then(data => {
        setProduct(data);
      });
    apiGet(`products/${productId}/reviews`)
      .then(data => {
        setReviews(data.contents);
        setIsLoading(false);
      });
  }
  , [productId]);


  if (isLoading) return <Text>Loading...</Text>;

  return <ProductDetails product={product} reviews={reviews} setReviews={setReviews} />;
};
