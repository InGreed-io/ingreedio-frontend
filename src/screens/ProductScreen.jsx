import { useState, useEffect, useContext } from "react";
import { ProductDetails } from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";
import usePagination from "../hooks/usePagination";
import { AuthContext } from "../components/AuthProvider";

export const ProductScreen = () => {
  const { productId } = useParams();
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [queryParams] = useState({});
  const { role } = useContext(AuthContext);
  const [next, prev, page, maxPage, setPageResetted] = usePagination(`products/${productId}/reviews`, (contents) => setReviews(contents), queryParams, 0, 4);

  useEffect(() => {
    apiGet(`Panel/products/${productId}`)
      .then(data => {
        setProduct(data);
        if (role !== "Moderator")
          setEditable(true);
      }).catch(() => {
        apiGet(`products/${productId}`)
          .then(data => {
            setProduct(data);
            setEditable(false);
          });
      });

  }
    , [productId, reviews]);


  return <ProductDetails product={product} reviews={reviews} prev={prev} next={next} setPageResetted={setPageResetted} maxPage={maxPage} page={page} isEditable={editable} />;
};
