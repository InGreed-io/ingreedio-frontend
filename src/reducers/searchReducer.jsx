export const searchReducer = (searchData, action) => {
  switch(action.type) {
  case "updateIngredients": {
    searchData.ingredients = action.ingredients; 

    return searchData;
  }
  case "updateCategory": {
    searchData.category = action.category; 

    return searchData;
  }
  case "updateSearchPhrase": {
    searchData.searchPhrase = action.searchPhrase; 
    
    return searchData;
  }
  } 
};

export const initialSearchData = {
  category: undefined,
  searchPhrase: null,
  ingredients: [],
};
