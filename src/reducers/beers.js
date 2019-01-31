export default (state = [], action) => {
  switch (action.type) {
    case "SET_BEERS": 
      return action.beers
    case "ADD_BEER": 
      return [
        ...state,
        action.beer
      ];
    case "UPDATE_BEER": 
      return state.map((beer) => {
        if (beer._id === action.id) {
          return {
            ...beer,
            ...action.currentDraft 
          };
        } else {
          return beer;
        };
    });
    case "REMOVE_BEER": 
      return state.filter(beer => beer._id !== action.id)
      
    default:
      return state;
  }
};