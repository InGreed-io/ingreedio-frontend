export const searchReducer = (searchData, action) => {
  switch (action.type) {
    case "update": {
      return {
        ingredients: action.ingredients,
        category: action.category,
        searchPhrase: action.searchPhrase,
      }
    }
    case "updateIngredients": {
      return {
        ...searchData,
        ingredients: action.ingredients
      }
    }
    case "updateCategory": {
      return {
        ...searchData,
        category: action.category
      }
    }
    case "updateSearchPhrase": {
      return {
        ...searchData,
        searchPhrase: action.searchPhrase
      }
    }
  }
};

export const initialSearchData = {
  category: undefined,
  searchPhrase: null,
  ingredients: [],
};
