export default (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_MSG':
      return action.msg
    default:
      return state;
  }
};