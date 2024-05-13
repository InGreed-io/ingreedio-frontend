export const searchReducer = (searchData, action) => {
  switch (action.type) {
  case "update": {
    return {
      ...searchData,
      ingredients: action.ingredients,
      category: action.category,
      query: action.query,
      sortBy: action.sortBy
    };
  }
  case "updateIngredients": {
    return {
      ...searchData,
      ingredients: action.ingredients
    };
  }
  case "updateCategory": {
    return {
      ...searchData,
      category: action.category
    };
  }
  case "updateQuery": {
    return {
      ...searchData,
      query: action.query
    };
  }
  case "updateSortBy": {
    return {
      ...searchData,
      sortBy: action.sortBy
    };
  }
  }
};

export const initialSearchData = {
  category: undefined,
  query: null,
  ingredients: [],
  sortBy: "Featured",
};
