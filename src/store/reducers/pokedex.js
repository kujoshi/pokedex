import {POKEDEX_LIST, POKEDEX_DETAIL} from '../actionTypes/pokedex'


const pokedexListStart = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true,
    fetchPokemon: true,
    isFetched: false
  });
};

const pokedexListSuccess = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
    fetchPokemon: false,
    isFetched: true,
    data: action.data
  });
};

const pokedexListFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
    fetchPokemon: false,
    isFetched: true,
    error: action.error
  });
};

const pokedexDetailStart = (state, action) => {
  return Object.assign({}, state, {
    isLoading: true,
    fetchDetail: true,
  });
};

const pokedexDetailSuccess = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
    fetchDetail: false,
    detail: action.data
  });
};

const pokedexDetailFail = (state, action) => {
  return Object.assign({}, state, {
    isLoading: false,
    fetchDetail: false,
    error: action.error
  });
};

const pokedex = (state = null, action) => {
  switch (action.type) {
    case POKEDEX_LIST.START: return pokedexListStart(state, action);
    case POKEDEX_LIST.SUCCESS: return pokedexListSuccess(state, action);
    case POKEDEX_LIST.FAIL: return pokedexListFail(state, action);
    case POKEDEX_DETAIL.START: return pokedexDetailStart(state, action);
    case POKEDEX_DETAIL.SUCCESS: return pokedexDetailSuccess(state, action);
    case POKEDEX_DETAIL.FAIL: return pokedexDetailFail(state, action);
    default:
      return state;
  }
};

export default pokedex;
