import { useState, useEffect } from "react";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import { Text } from "@chakra-ui/react";
import usePagination from "../hooks/usePagination";

export const ProductScreen = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [queryParams] = useState({});
  const [productPerPage] = useState(4);
  const [next, prev, page, maxPage] = usePagination(`products/${productId}/reviews`, (contents) => setReviews(contents), queryParams, 0, productPerPage);
  useEffect(() => {
    apiGet(`products/${productId}`)
      .then(data => {
        setProduct(data);
      });
  }
  , [productId]);


  return <ProductDetails product={product} reviews={reviews} setReviews={setReviews} prev={prev} next={next} maxPage={maxPage} page={page} />;
};
