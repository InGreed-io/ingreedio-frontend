import "@testing-library/jest-dom";
import { Searchbar } from "../components/Searchbar";
import { render, screen, fireEvent, waitFor } from "./testUtils";
import { act } from "react-dom/test-utils";
import { initialSearchData } from "../reducers/searchReducer";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

const categories = [
  { value: "1", label: "Cosmetics" },
  { value: "2", label: "Dietary Supplements" },
  { value: "3", label: "Medicines" },
  { value: "4", label: "Food" },
];

const ingredients = [
  { value: "1", label: "Coconut oil" },
  { value: "2", label: "Cocoa" },
  { value: "3", label: "Coconut" },
  { value: "4", label: "Cocoa butter" },
];

jest.mock("../utils/api", () => ({
  apiGet: jest.fn().mockImplementation((endpoint) => {
    switch (endpoint) {
    case "ingredients":
      return Promise.resolve({
        content: categories.map(cat => ({ id: cat.value, name: cat.label })),
        pageCount: 5,
        limit: 5,
      });
    default:
      return Promise.resolve([]);
    }
  }),
}));

const searchData = initialSearchData;
const dispatchSearchData = (search) => search;

describe("Searchbar Tests", () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <RouterProvider router={createMemoryRouter([
          {
            path: "/",
            element: <Searchbar searchData={searchData}
              dispatchSearchData={dispatchSearchData}
              ingredients={ingredients}
              categories={categories} />
          }
        ])} />
      );
    });
  });

  test("should render form elements", async () => {

    expect(screen.getByLabelText("Select")).toBeInTheDocument();
    expect(screen.getByLabelText("Search phrase")).toBeInTheDocument();
    expect(screen.getByLabelText("Multi select")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  test("should update search phrase when input changes", async () => {

    const searchInput = screen.getByLabelText("Search phrase");

    fireEvent.change(searchInput, { target: { value: "Test search" } });

    expect(searchInput.value).toBe("Test search");
  });

  test("should select a category from dropdown", async () => {

    const categorySelect = screen.getByLabelText("Category");

    fireEvent.change(categorySelect, { target: { value: "Dietary Supplements" } });

    await waitFor(() => {
      expect(categorySelect.value).toBe("Dietary Supplements");
    });
  });

  test("should only allow selecting categories from the endpoint", async () => {

    const categorySelect = screen.getByLabelText("Category");

    fireEvent.change(categorySelect, { target: { value: "Magic potions" } });
    fireEvent.keyDown(categorySelect, { key: "Enter", code: "Enter", charCode: 13 });

    await waitFor(() => {
      expect(screen.queryByText("Magic potions")).toBeNull();
    });
  });

  test("should select multiple ingredients from multi-select", async () => {

    const ingredientSelect = screen.getByLabelText("Multi select");

    fireEvent.change(ingredientSelect, {
      target: { value: ["Coconut oil", "Cocoa"] },
    });

    await waitFor(() => {
      expect(ingredientSelect.value).toContain("Coconut oil");
      expect(ingredientSelect.value).toContain("Cocoa");
    });
  });
});
