import {POKEDEX_LIST, POKEDEX_DETAIL} from '../actionTypes/pokedex'
import axios from "axios";


export const pokedexList = (limit, offset) => {
  return async (dispatch) => {
    dispatch(pokedexListStart());
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset);
      dispatch(pokedexListSuccess(response.data));
    } catch (error) {
      dispatch(pokedexListFail('Something went wrong in finding the list'));
    }
  };
};

export const pokedexListStart = () => {
  return {
    type: POKEDEX_LIST.START
  };
};

export const pokedexListSuccess = (data) => {
  return {
    type: POKEDEX_LIST.SUCCESS,
    data
  };
};

export const pokedexListFail = (error) => {
  return {
    type: POKEDEX_LIST.FAIL,
    error
  };
};

export const pokedexDetail = (url) => {
  return async (dispatch) => {
    dispatch(pokedexDetailStart());
    try {
      const response = await axios.get(url);
      dispatch(pokedexDetailSuccess(response));
    } catch (error) {
      dispatch(pokedexDetailFail('No pokemon details found'));
    }
  };
};

export const pokedexDetailStart = () => {
  return {
    type: POKEDEX_DETAIL.START
  };
};

export const pokedexDetailSuccess = (data) => {
  return {
    type: POKEDEX_DETAIL.SUCCESS,
    data
  };
};

export const pokedexDetailFail = (error) => {
  return {
    type: POKEDEX_DETAIL.FAIL,
    error
  };
};
