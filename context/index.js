// Redux like state management system
import { useReducer, createContext } from 'react';

// initial state
const initialState = {
  user: null,
};

// create context
const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // keep state and update user from the payload
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// wrap entire app with context provider,
// therefore allowing entire app to have access to the context.
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
