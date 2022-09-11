import { defineAction } from 'redux-define';
import { START, SUCCESS, FAIL } from '../../constants/stateConstants';

const pokedex = defineAction('pokedex');
export const POKEDEX_LIST = pokedex.defineAction('POKEDEX_LIST', [START, SUCCESS, FAIL]);
export const POKEDEX_DETAIL = pokedex.defineAction('POKEDEX_DETAIL', [START, SUCCESS, FAIL]);