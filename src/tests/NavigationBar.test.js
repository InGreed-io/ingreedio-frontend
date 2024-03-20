import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';

describe('NavigationBar Tests', () => {
  test('should render logo', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    const menuToggleButton = screen.getByLabelText('Open Menu');

    // Simulate a user click to open the menu
    userEvent.click(menuToggleButton);

    const primaryLogo = screen.getByTestId('logo');
    expect(primaryLogo).toBeInTheDocument();

    const hiddenLogo = screen.getByTestId('logo-hamburgermenu');
    expect(hiddenLogo).not.toBeInTheDocument(); // Ensure no hidden logo is found
  });

  test('should render navigation links', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const aboutLink = screen.getByRole("button", { name: "About Us" });
    const pricingLink = screen.getByRole("button", { name: "Pricing" });
    const termsLink = screen.getByRole("button", { name: "Terms and Conditions" });

    expect(aboutLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  test('navigation links are clickable', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const aboutLink = screen.getByRole("button", { name: "About Us" });
    const pricingLink = screen.getByRole("button", { name: "Pricing" });
    const termsLink = screen.getByRole("button", { name: "Terms and Conditions" });

    fireEvent.click(aboutLink);
    expect(window.location.pathname).toBe('/about');

    fireEvent.click(pricingLink);
    expect(window.location.pathname).toBe('/pricing');

    fireEvent.click(termsLink);
    expect(window.location.pathname).toBe('/tos');
  });

  test('should render login and sign up buttons', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const loginButton = screen.getByRole("button", { name: "Log In" });
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test('login and sign up buttons should be clickable', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const loginButton = screen.getByRole("button", { name: "Log In" });
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(loginButton);
    // TODO: assertions for login functionality

    fireEvent.click(signUpButton);
    // TODO: assertions for sign up functionality
  });

  test('mobile menu should be togglable', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );
    const hamburgerIcon = screen.getByLabelText('Open Menu');
    fireEvent.click(hamburgerIcon);

    const aboutLink = screen.getByRole("button", { name: "About Us" });
    const pricingLink = screen.getByRole("button", { name: "Pricing" });
    const termsLink = screen.getByRole("button", { name: "Terms and Conditions" });

    expect(aboutLink).toBeInTheDocument();
    expect(pricingLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });
});
