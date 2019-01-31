export default (beers, { sortBy, text }) => {
  return beers.filter(beer => {
    if(sortBy === 'draft') {
      return beer.currentDraft && 
        (beer["Brewery Name"].toLowerCase().includes(text.toLowerCase()) || 
         beer["Beer Name"].toLowerCase().includes(text.toLowerCase()))
    } else {
      return (
        beer["Brewery Name"].toLowerCase().includes(text.toLowerCase()) || 
        beer["Beer Name"].toLowerCase().includes(text.toLowerCase())
      )}
  }).sort((a, b) => {
      if (sortBy === 'brewery_name') {
        return a["Brewery Name"].toLowerCase() > b["Brewery Name"].toLowerCase() ? 1 : -1;
      } else if (sortBy === 'beer_name') {
        return a["Beer Name"].toLowerCase() > b["Beer Name"].toLowerCase() ? 1 : -1;
      } else if (sortBy === 'abv') {
        return a["ABV"].replace(/[^\d.-]/g, '') - b["ABV"].replace(/[^\d.-]/g, '')
      }
  });
};