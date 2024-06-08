import usePagination from "../hooks/usePagination";
import { useState } from "react";
import { ReviewBox } from "../components/ProductDetails/ReviewBox";
import { Flex, Button, Text, useToast, Input } from "@chakra-ui/react";
import { apiDelete } from "../utils/api";

export const PanelUsersListing = () => {

    const toast = useToast();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState({emailQuery: ''});
    const [next, prev, page, maxPage, setPageResetted] = usePagination('Panel/users', (contents) => setUsers(contents), query, 0, 8);

    return (
        <Flex flexDirection='column' justifyContent='center'>
            <Input
                m='1em'
                justifySelf='center'
                mx='10%'
                placeholder="Search email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}>
            </Input>
            <Flex flexDirection='row' flexWrap='wrap'>
                {
                    users.map(user => <Text>{user.email}   |</Text>)
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
}