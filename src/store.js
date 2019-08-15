import { createStore } from 'redux';
// import { initialCards } from '../data';

const initialState = {
  searchTerm: '',
  loggedIn: false,
  username: '',
  cards: [],
  currentCard: {},
  addedItems: [],
  total: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'searchQuery':
      return { ...state, searchTerm: action.searchTerm };
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, username: action.username };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        username: '',
      };
    case 'CURRENT_CARD':
      return { ...state, currentCard: initialState.cards[action.cardId] };
    case 'SET_ITEMS':
      return { ...state, cards: action.items };
    case 'ADD_TO_CART':
      let addedItem = state.cards.find((item) => item.id === action.id);
      let existed_item = state.addedItems.find((item) => action.id === item.id);
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + Number(addedItem.price),
        };
      } else {
        addedItem.quantity = 1;
        let newTotal = state.total + Number(addedItem.price);

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }
    case 'REMOVE_ITEM':
      let itemToRemove = state.addedItems.find((item) => action.id === item.id);
      let new_items = state.addedItems.filter((item) => action.id !== item.id);

      let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
