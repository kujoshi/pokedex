import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PokedexList  from './components/PokedexList';

import { Provider } from 'react-redux'

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { initialState, pokedexReducer } from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ...pokedexReducer
});

const store = createStore(
  rootReducer,
  {
    ...initialState
  },
  composeEnhancers(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <PokedexList />
  </Provider>
);
