// Redux like state management system
import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  useEffect(() => {
    // get data from local storage
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  // execute for responses
  axios.interceptors.response.use(
    function (response) {
      // trigger when status code is 2XX
      return response;
    },
    function (error) {
      // trigger for status codes outside of 2XX
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          // log user out and redirect
          axios
            .get('/api/logout')
            .then((data) => {
              console.log('/401 error > logout');
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              router.push('/login');
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTOR ERR', err);
              reject(error);
            });
        });
      }

      return Promise.reject(error);
    }
  );

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
