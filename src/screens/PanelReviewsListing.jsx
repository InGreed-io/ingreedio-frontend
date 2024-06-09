import usePagination from "../hooks/usePagination";
import { useState, useEffect } from "react";
import { Flex, Button, Text, useToast } from "@chakra-ui/react";
import { apiDelete, hasPanelReviewsTabAccess } from "../utils/api";
import { useOutletContext, useNavigate } from "react-router-dom";
import { ReportedReviewBox } from "../components/ProductDetails/ReportedReviewBox";

export const PanelReviewsListing = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [next, prev, page, maxPage] = usePagination("Panel/reviews/reported", (contents) => setReviews(contents), null, 0, 8);
  const { role } = useOutletContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!hasPanelReviewsTabAccess(role)) {
      navigate(-1);
    } else {
      setIsAuthorized(true);
    }
  }, [role, isAuthorized, navigate]);

  if(!isAuthorized) return null;
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
          reviews.map((review) => <ReportedReviewBox key={review.id} review={review} onDelete={handleDeleteReview} />)
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
