import {
  Button, ButtonGroup, IconButton
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

export const AccountSection = ({ username, logout, justifyContent = "flex-start", isHidden = false }) => {
  return (
    <ButtonGroup justifyContent={justifyContent} gap="5">
      {username ?
        <>
          <Link to="/user/favorites" style={{ alignSelf: "center" }}>
            <IconButton
              icon={<Favorite />}
              boxSize={10}
              color={"brand.primary"}
              backgroundColor={"inherit"}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "2rem"
                }
              }}
            />
          </Link>
          <Link to="/user/details" style={{ alignSelf: "center" }}>
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
            <Button variant="link" aria-label={`Log In${isHidden ? " Hidden" : ""}`}>
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button px="5" aria-label={`Sign Up${isHidden ? " Hidden" : ""}`}>
              Sign Up
            </Button>
          </Link>
        </>
      }
    </ButtonGroup>
  );
};
