import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "./testUtils";
import { NavigationBar } from "../components/NavigationBar";


describe("NavigationBar Tests", () => {
  beforeEach(() => {
    render(
      <NavigationBar />
    );
  });

  test("should render logo", () => {
    const primaryLogo = screen.getByTestId("logo");    
    const hiddenLogo = screen.getByTestId("logo-hidden");

    expect(primaryLogo).toBeInTheDocument();
    expect(hiddenLogo).toBeInTheDocument();
  });

  test("should render navigation links", () => {

    const aboutLink = screen.getByLabelText("About Us");
    const pricingLink = screen.getByLabelText("Pricing");
    const termsLink = screen.getByLabelText("Terms and Conditions");

    expect(aboutLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  test("navigation links should be clickable and redirect", () => {

    const aboutLink = screen.getByLabelText("About Us");
    const pricingLink = screen.getByLabelText("Pricing");
    const termsLink = screen.getByLabelText("Terms and Conditions");
    const aboutLinkHidden = screen.getByLabelText("About Us Hidden");
    const pricingLinkHidden = screen.getByLabelText("Pricing Hidden");
    const termsLinkHidden = screen.getByLabelText("Terms and Conditions Hidden");

    fireEvent.click(aboutLink);
    expect(window.location.pathname).toBe("/about");
    
    fireEvent.click(pricingLink);
    expect(window.location.pathname).toBe("/pricing");

    fireEvent.click(termsLink);
    expect(window.location.pathname).toBe("/tos");

    const hamburgerIcon = screen.getByLabelText("Open Menu");
    fireEvent.click(hamburgerIcon);

    fireEvent.click(aboutLinkHidden);
    expect(window.location.pathname).toBe("/about");

    fireEvent.click(pricingLinkHidden);
    expect(window.location.pathname).toBe("/pricing");

    fireEvent.click(termsLinkHidden);
    expect(window.location.pathname).toBe("/tos");
  });

  test("should render login and sign up buttons", () => {

    const loginButton = screen.getByLabelText("Log In");
    const signUpButton = screen.getByLabelText("Sign Up");
    const loginButtonHidden = screen.getByLabelText("Log In Hidden");
    const signUpButtonHidden = screen.getByLabelText("Sign Up Hidden");

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(loginButtonHidden).toBeInTheDocument();
    expect(signUpButtonHidden).toBeInTheDocument();
  });

  test("login buttons should redirect to /login", () => {

    const loginButton = screen.getByLabelText("Log In");
    const loginButtonHidden = screen.getByLabelText("Log In Hidden");

    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe("/login");

    fireEvent.click(loginButtonHidden);
    expect(window.location.pathname).toBe("/login");

  });

  test("sign up buttons should direct to /signup", () => {

    const signUpButton = screen.getByLabelText("Sign Up");
    const signUpButtonHidden = screen.getByLabelText("Sign Up Hidden");

    fireEvent.click(signUpButton);
    expect(window.location.pathname).toBe("/signup");

    fireEvent.click(signUpButtonHidden);
    expect(window.location.pathname).toBe("/signup");
  });
});
