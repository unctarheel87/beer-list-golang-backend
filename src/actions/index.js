// beers actions

export const setBeers = beers => {
  return {
    type: "SET_BEERS",
    beers
  }
}

export const add_Beer = beer => {
  return {
    type: "ADD_BEER",
    beer
  }
}

export const update_Beer = (id, currentDraft) => {
  return {
    type: "UPDATE_BEER",
    id,
    currentDraft
  }
}

export const remove_Beer = id => {
  return {
    type: "REMOVE_BEER",
    id
  }
}

// filter actions

export const sortByBreweryName = () => {
  return {
    type: "SORT_BY_BREWERY_NAME"
  }
}

export const sortByBeerName = () => {
  return {
    type: "SORT_BY_BEER_NAME"
  }
}

export const sortByABV = () => {
  return {
    type: "SORT_BY_ABV"
  }
}

export const sortByDraft = () => {
  return {
    type: "SORT_BY_DRAFT"
  }
};

export const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
};

// messages actions

export const updateMsg = (msg) => {
  return {
    type: "UPDATE_MSG",
    msg
  }
}
