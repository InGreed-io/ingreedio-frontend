import {
  Button, ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const AccountSection = ({ username, logout, justifyContent = "flex-start" }) => {
  return (
    <ButtonGroup justifyContent={justifyContent} gap="5">
      {username ?
        <>
          <Link to="/details" style={{ alignSelf: "center" }}>
            <Button variant="link" aria-label="User Details">
              {username}
            </Button>
          </Link>
          <Link to="/">
            <Button px="5" onClick={logout} aria-label="Log Out">
              Log out
            </Button>
          </Link>
        </>
        :
        <>
          <Link to="/login" style={{ alignSelf: "center" }}>
            <Button variant="link" aria-label="Log In">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button px="5" aria-label="Sign Up">
              Sign Up
            </Button>
          </Link>
        </>
      }
    </ButtonGroup>
  );
}
