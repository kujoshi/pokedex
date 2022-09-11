import pokedex from './pokedex';

export const initialState = {
  pokedex: {
    isFetched: false,
    isLoading: false,
    error: null,
    data: {},
    detail: {}
  }
};

export const pokedexReducer = {
  pokedex
};
