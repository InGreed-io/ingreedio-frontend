import usePagination from "../hooks/usePagination";
import { useState, useContext, useEffect } from "react";
import { ReviewBox } from "../components/ProductDetails/ReviewBox";
import { Flex, Button, Text, useToast } from "@chakra-ui/react";
import { apiDelete } from "../utils/api";
import { AuthContext } from "../components/AuthProvider";
import { hasAdminPanelAccess } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const PanelReviewsListing = () => {

  const toast = useToast();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [next, prev, page, maxPage] = usePagination("Panel/reviews/reported", (contents) => setReviews(contents), null, 0, 8);

  const { loading, token, role } = useContext(AuthContext);
  
  useEffect(() => {
    if (!loading && (!token || !hasAdminPanelAccess(role))) {
      navigate("/");
    }
  }, [token, role, loading, navigate]);

  const handleDeleteReview = (reviewId) => {
    apiDelete(`Panel/reviews/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(() => {
        toast({
          title: "Error.",
          description: "Error deleting review.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

      });
  };

  return (
    <Flex flexDirection='column'>
      <Flex flexWrap='wrap' gap='10' justifyContent='center'>
        {
          reviews.map((review) => <ReviewBox key={review.id} id={review.id} name={review.username} content={review.text} rating={review.rating} isPanel onDelete={handleDeleteReview} />)
        }
      </Flex>
      <Flex
        justifyContent={"center"}
        gap={5}
        alignItems={"center"}>
        <Button
          size={"md"}
          isDisabled={page === 0}
          onClick={prev}
        >Prev</Button>
        <Text>
          {page}
        </Text>
        <Button
          isDisabled={page === maxPage}
          onClick={next}
          size={"md"}>Next</Button>
      </Flex>
    </Flex>
  );
};