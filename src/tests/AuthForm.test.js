import "@testing-library/jest-dom";
import { AuthForm } from "../components/AuthForm";
import { render, fireEvent } from "./testUtils";
import { BrowserRouter } from "react-router-dom";

const loginProps = {
  title: "Login",
  emailValue: "",
  passwordValue: "",
  onEmailChange: jest.fn(),
  onPasswordChange: jest.fn(),
  onSubmit: jest.fn(),
};

const registerProps = {
  title: "Register",
  isRegister: true,
  emailValue: "",
  passwordValue: "",
  repeatPasswordValue: "",
  onEmailChange: jest.fn(),
  onPasswordChange: jest.fn(),
  onRepeatPasswordChange: jest.fn(),
  onSubmit: jest.fn(),
};

describe("AuthForm Tests", () => {
  it("should render Login AuthForm correctly", () => {
    const { getByPlaceholderText, getByRole } = render(<BrowserRouter><AuthForm {...loginProps} /></BrowserRouter>);

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should render Register AuthForm correctly", () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<BrowserRouter><AuthForm {...registerProps} /></BrowserRouter>);

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
    expect(getByPlaceholderText("Repeat Password")).toBeInTheDocument();
    expect(getByRole("button", { name: "Register" })).toBeInTheDocument();
    expect(getByText("Already got an account?")).toBeInTheDocument();
  });

  it("should show error messages when invalid email or password is entered", async () => {
    const { getByPlaceholderText, getByText } = render(<BrowserRouter><AuthForm {...registerProps} /></BrowserRouter>);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const repeatPasswordInput = getByPlaceholderText("Repeat Password");

    fireEvent.change(emailInput, { target: { value: "invalidemail.com" } });
    fireEvent.change(passwordInput, { target: { value: "weak" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "password" } });

    expect(getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(getByText("Password must be at least 8 characters long.")).toBeInTheDocument();
    expect(getByText("Passwords must match.")).toBeInTheDocument();
  });

  it("should show no errors when valid email and password are entered", async () => {

    const { getByPlaceholderText, queryByText } = render(<BrowserRouter><AuthForm {...registerProps} /></BrowserRouter>);
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const repeatPasswordInput = getByPlaceholderText("Repeat Password");

    fireEvent.change(emailInput, { target: { value: "polny@barmleczny.com" } });
    fireEvent.change(passwordInput, { target: { value: "GoudaFromRadom1@" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "GoudaFromRadom1@" } });

    expect(queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
    expect(queryByText("Password must be at least 8 characters long.")).not.toBeInTheDocument();
    expect(queryByText("Password must contain at least one lowercase letter.")).not.toBeInTheDocument();
    expect(queryByText("Password must contain at least one uppercase letter.")).not.toBeInTheDocument();
    expect(queryByText("Password must contain at least one number.")).not.toBeInTheDocument();
    expect(queryByText("Password must contain at least one special character (@, $, !, %, *, ?, or &).")).not.toBeInTheDocument();
  });
});
