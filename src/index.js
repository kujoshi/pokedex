import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PokedexList  from './components/PokedexList';
import PokedexDetail from './components/PokedexDetail';

import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
// export const store = configureStore({
//   reducer: {
//     pokedexReducer: pokedexReducer,
//   }
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route path="/" element={<PokedexList />}>
          <Route path="/detail" element={<PokedexDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
