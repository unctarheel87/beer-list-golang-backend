export default (state = {
  sortBy: '', text: ''
}, action) => {
  switch (action.type) {
    case 'SORT_BY_BREWERY_NAME':
      return {
        ...state,
        sortBy: 'brewery_name'
      };
    case 'SORT_BY_BEER_NAME':
      return {
        ...state,
        sortBy: 'beer_name'
      };
    case 'SORT_BY_ABV':
      return {
        ...state,
        sortBy: 'abv'
    };
    case 'SORT_BY_DRAFT':
      return {
        ...state,
        sortBy: 'draft'
    };
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    default:
      return state;
  }
};