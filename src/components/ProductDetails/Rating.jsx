import React, { useState } from "react";
import { Box, Stack, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const RatingIcon = ({ fill, size }) => {
  return (
    <StarIcon
      w={size}
      h={size}
      color={"gold"}
      stroke={"grey"}
      fillOpacity={fill ? "100%" : "0"}
    />
  );
};

const scale = 5;

export const StaticRating = ({ rating, size }) => {
    const stars = [];

    for (let i = 1; i <= scale; i++) {
      stars.push(<RatingIcon key={i} idx={i} fill={i <= rating} size={size} />);
    }

    return (
      <Flex gap={size / 4}>
        {stars}
      </Flex>
    );
}

const Rating = React.forwardRef(
  ({ size }, ref) => {
    const [rating, setRating] = useState("");
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };

    const RatingButton = ({ idx, fill }) => {
      return (
        <Box
          as="button"
          aria-label={`Rate ${idx}`}
          height={size}
          width={size}
          variant="unstyled"
          mx={1}
          onClick={() => onClick(idx)}
          _focus={{ outline: 0 }}
        >
          <RatingIcon fill={fill} size={size} />
        </Box>
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }

    return (
      <Stack isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;

