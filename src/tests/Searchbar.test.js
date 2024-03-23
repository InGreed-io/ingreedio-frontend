import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Searchbar } from "../components/Searchbar";
import { render, screen, fireEvent, waitFor } from "./testUtils";
import { act } from "react-dom/test-utils";

jest.mock("../utils/api", () => ({
  apiGet: jest.fn().mockImplementation((endpoint) => {
    switch (endpoint) {
    case "categories":
      return Promise.resolve([
        { id: "1", name: "Cosmetics" },
        { id: "2", name: "Dietary Supplements" },
        { id: "3", name: "Medicines" },
        { id: "4", name: "Food" },
      ]);
    case "ingredients":
      return Promise.resolve([
        { id: "1", name: "Coconut oil" },
        { id: "2", name: "Cocoa" },
        { id: "3", name: "Coconut" },
        { id: "4", name: "Cocoa butter" },
      ]);
    default:
      return Promise.resolve([]);
    }
  }),
}));


describe("Searchbar Tests", () => {
  
  test("should render form elements", async () => {

    await act(async () => {
      render(
        <Router>
          <Searchbar />
        </Router>
      );});

    expect(screen.getByLabelText("Select")).toBeInTheDocument();
    expect(screen.getByLabelText("Search phrase")).toBeInTheDocument();
    expect(screen.getByLabelText("Multi select")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("should update search phrase when input changes", async () => {
    const screen = await act(async () => {
      return render(
        <Router>
          <Searchbar />
        </Router>
      );});
    const searchInput = screen.getByLabelText("Search phrase");
  
    fireEvent.change(searchInput, { target: { value: "Test search" } });
  
    expect(searchInput.value).toBe("Test search");
  });

  test("should select a category from dropdown", async () => {
    const screen = await act(async () => {
      return render(
        <Router>
          <Searchbar />
        </Router>
      );});
    const categorySelect = screen.getByLabelText("Category");

    fireEvent.change(categorySelect, { target: { value: "Dietary Supplements" } });
    
    await waitFor(() => {
      expect(categorySelect.value).toBe("Dietary Supplements");
    });
  });

  test("should only allow selecting categories from the endpoint", async () => {
    const screen = await act(async () => {
      return render(
        <Router>
          <Searchbar />
        </Router>
      );});
    const categorySelect = screen.getByLabelText("Category");

    fireEvent.change(categorySelect, { target: { value: "Magic potions" } });
    fireEvent.keyDown(categorySelect, {key: "Enter", code: "Enter", charCode: 13});

    await waitFor(() => {
      expect(screen.queryByText("Magic potions")).toBeNull();
    });
  });
  
  test("should select multiple ingredients from multi-select", async () => {
    const screen = await act(async () => {
      return render(
        <Router>
          <Searchbar />
        </Router>
      );
    });
    const ingredientSelect = screen.getByLabelText("Multi select");
  
    fireEvent.change(ingredientSelect, {
      target: { value: ["Coconut oil", "Cocoa"] },
    });
  
    await waitFor(() => {
      expect(ingredientSelect.value).toContain("Coconut oil");
      expect(ingredientSelect.value).toContain("Cocoa");
    });

  });
  test("should only allow selecting ingredients from the endpoint", async () => {
    const screen = await act(async () => {
      return render(
        <Router>
          <Searchbar />
        </Router>
      );
    });
  
    const ingredientSelect = screen.getByLabelText("Multi select");
  
    fireEvent.change(ingredientSelect, { target: { value: "Coconut oil" } });
    fireEvent.keyDown(ingredientSelect, {key: "Enter", code: "Enter", charCode: 13});
    fireEvent.change(ingredientSelect, { target: { value: "Milk" } }); // element not in server json
    fireEvent.keyDown(ingredientSelect, {key: "Enter", code: "Enter", charCode: 13});

    await waitFor(() => {
      expect(screen.queryByText("Coconut oil")).toBeInTheDocument();
      expect(screen.queryByText("Milk")).toBeNull(); // Ensure 'Milk' is not selected
    });
  });
/*
test('calls handleSubmit on form submission', async () => {
  // TODO when handleSubmit is implemented
*/
});