import {
  Button, ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { hasAdminPanelAccess } from "../../utils/api";


export const NavigationLinks = ({ flexDirection, role, isHidden = false }) => {
  return (
    <ButtonGroup flexDirection={flexDirection} gap={2} spacing={0} p={2} variant="link" >
      <Link to="/about">
        <Button aria-label={`About Us${isHidden ? " Hidden": ""}`}>
          About Us
        </Button>
      </Link>
      <Link to="/pricing">
        <Button aria-label={`Pricing${isHidden ? " Hidden": ""}`}>
          Pricing
        </Button>
      </Link>
      <Link to="/tos">
        <Button aria-label={`Terms and Conditions${isHidden ? " Hidden": ""}`}>
          Terms and Conditions
        </Button>
      </Link>
      {hasAdminPanelAccess(role) ?
        <Link to="/panel">
          <Button aria-label='Admin, Moderator or Producer Panel'>
            Admin Panel
          </Button>
        </Link> : undefined}
    </ButtonGroup >
  );
};
