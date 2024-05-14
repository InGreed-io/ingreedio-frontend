import { Flex, Text, Image } from "@chakra-ui/react";
import { IngredientBox } from "./IngredientBox";
import { ReviewBox } from "./ReviewBox";

export const ProductDetails = ({ product }) => {

    if (!product) return null

    const {
       name,
       iconUrl,
       rating,
       ratingsCount,
       //ingredients,
       features,
       favourite,
       companyName,
       description
     } = product;
     const ingredients = ["Milk"];

    // const prod = {
    //     name: "Cow Milk",
    //     iconUrl: "https://mlekovita.com.pl/media/cache/product_view/uploads/images/i3bRQpfKXVq01voDWA7x/8616-mleko-i-love-milk-3-5-3d.jpg",
    //     rating: 4.3,
    //     ratingsCount: 5,
    //     ingredients: ["Milk", "Milk", "Milk", "Milk"],
    //     featured: true,
    //     favourite: true,
    //     companyName: "Mlekovita",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    // };

    const review = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    return (
        <Flex
            align="start"
            justifyContent="start"
            flexDirection="column"
            flexWrap="wrap">
            <Flex flexDirection="row"
                justify="start"
                flexWrap="wrap">
                <Image src={iconUrl}
                    borderRadius={25}
                    maxH="400px"
                    margin="40px"
                    marginLeft="0px"
                    boxShadow="4px 4px 20px rgba(0, 0, 0, 0.25)" />
                <Flex flexDirection="column"
                    justify="start"
                    textAlign="start"
                    padding="40px">
                    <Text
                        fontFamily="Playfair Display"
                        color="#000000"
                        fontWeight={900}
                        fontSize={36}>
                        {name}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        color="brand.greenishGray"
                        fontWeight={100}
                        fontSize={24}
                        textDecoration="underline">
                        {companyName}
                    </Text>
                    <Text
                        fontFamily="Inter"
                        color="brand.greenishGray"
                        fontWeight={300}
                        fontSize={24}
                        marginTop="25px">
                        {description}
                    </Text>
                </Flex>
            </Flex>
            <Text
                fontFamily="Playfair Display"
                color="brand.primary"
                fontWeight={900}
                fontSize={36}>
                Ingredients:
            </Text>

            <Flex
            flexWrap="wrap">
                {ingredients ? (ingredients.map(p => <IngredientBox name={p} />)) : ""}
            </Flex>
            <Text
                fontFamily="Playfair Display"
                color="brand.primary"
                fontWeight={900}
                fontSize={36}
                margin="25px"
                marginLeft="0px">
                Reviews:
            </Text>
            <Flex
            flexDirection="row"
            flexWrap="wrap">
            <ReviewBox name="Konrad" content={review}/>
            <ReviewBox name="Borys" content={review}/>
            <ReviewBox name="Marek" content={review}/>
            <ReviewBox name="Bartosz" content={review}/>
            </Flex>
        </Flex>
    );
}