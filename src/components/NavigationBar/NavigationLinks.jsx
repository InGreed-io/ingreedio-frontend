import {
  Button, ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { hasAdminPanelAccess } from "../../utils/api";


export const NavigationLinks = ({ flexDirection, role, isHidden = false, isPanel = false }) => {

  return (
    <ButtonGroup flexDirection={flexDirection} gap={2} spacing={0} p={2} variant="link" >
      {!isPanel ?
        <>
          <Link to="/about">
            <Button aria-label={`About Us${isHidden ? " Hidden" : ""}`}>
              About Us
            </Button>
          </Link>
          <Link to="/pricing">
            <Button aria-label={`Pricing${isHidden ? " Hidden" : ""}`}>
              Pricing
            </Button>
          </Link>
          <Link to="/tos">
            <Button aria-label={`Terms and Conditions${isHidden ? " Hidden" : ""}`}>
              Terms and Conditions
            </Button>
          </Link>
          {hasAdminPanelAccess(role) ? (
            <Link to="/panel">
              <Button aria-label={`Panel${isHidden ? " Hidden" : ""}`}>
                Admin Panel
              </Button>
            </Link>
          ) : undefined}
        </>
        :
        <>
          <Link to="/panel/users">
            <Button aria-label="Users">
              Users
            </Button>
          </Link>
          <Link to="/panel/reported">
            <Button aria-label="Reported Reviews">
              Reviews
            </Button>
          </Link>
          <Link to="/panel/products">
            <Button aria-label="Products">
              Products
            </Button>
          </Link>
        </>
      }
    </ButtonGroup >
  );
};
