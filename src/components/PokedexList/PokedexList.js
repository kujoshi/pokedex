import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import './PokedexList.css';
import { pokedexList, pokedexDetail } from '../../store/actions/pokedex';
import ReactPaginate from 'react-paginate';
import PokedexDetail from '../PokedexDetail';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { get } from 'lodash/object';


const PokedexList = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonListAll, setPokemonListAll] = useState([]);
  const [pokemonDetailList, setPokemonDetailList] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [showPokedexDetails, setShowPokedexDetails] = useState(false);

  useEffect(() => {
    if (!props.pokedex.isFetched) {
      props.pokedexList(20, 0);
    }
  }, []);

  useEffect(() => {
    if (get(props , 'pokedex.fetchPokemon') === false && !props.pokedex.error) {
      const resultsWithId = props.pokedex.data.results.map(object => {
        return {...object, id: object.url.toString().split("/")[object.url.toString().split("/").length - 2]};
      });
      setPokemonListAll(resultsWithId);
      setPokemonList(resultsWithId.slice(0, 20));
      setPageCount(Math.ceil(props.pokedex.data.count / 20));
      if (pokemonListAll && pokemonListAll.length !== get(props, 'pokedex.data.count')) {
        props.pokedexList(props.pokedex.data.count, 0);
      }
    }
  }, [props.pokedex.fetchPokemon]);

  useEffect(() => {
    if (props.pokedex.fetchDetail === false) {
      setPokemonDetailList(get(props, 'pokedex.detail.data'));
      setShowPokedexDetails(true);
    }
  }, [props.pokedex.fetchDetail]);

  const handlePageClick = (e) => {
    let offset = (e.selected + 1) * 20;
    let start = offset - 20;
    let end = offset;
    setPokemonList(pokemonListAll.slice(start,end));
  };

  const openPokedexDetails = (url) => {
    props.pokedexDetail(url);
  }

  const closePokedexDetails = (e) => {
    setShowPokedexDetails(false);
  };

  const handleOnSearch = (string, results) => {
    if (string === '') {
      setPokemonList(pokemonListAll.slice(0, 20));
    }
  }

  const handleOnSelect = (item) => {
    const searchresult = pokemonListAll.filter(object => {
      return object.name === item.name;
    });
    setPokemonList(searchresult);
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  const pokemonCard = (pokemon) => {
    let splitURL = pokemon.url.toString().split("/");
    let cardNo = splitURL[splitURL.length - 2];
    let imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + cardNo + ".png";
    return (
      <Grid item xs={12} md={3} className="pokemonCardGrid" onClick={() => openPokedexDetails(pokemon.url)}>
        <Grid container>
          <Grid item xs={12}>
            <div className="pokemonImageDIv"> <img src={imageUrl} alt='pokemonImage'/></div>
          </Grid>
          <Grid item xs={12} className="pokemonTextGrid">
            <div className='pokemonName'>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</div>
            <div className='pokemonNumber'>#{String(cardNo).padStart(4, '0')}</div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <div className='header'>
        Pokedex
      </div>
      { showPokedexDetails && (
        <PokedexDetail
          pokemonDetailList={pokemonDetailList}
          closePokedexDetails={closePokedexDetails}
        />
      )
      }
      { !showPokedexDetails && pokemonList && (
        <div>
          <div className='searchDiv'>
            <ReactSearchAutocomplete
              items={pokemonListAll}
              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              autoFocus
              formatResult={formatResult}
            />
          </div>
          <Grid container justifyContent='center' alignItems='center' className="pokemonListGrid">
            {pokemonList && pokemonList.map((pokemon, index) => {
              return (
                <React.Fragment key={index}>
                  {pokemonCard(pokemon)}
                </React.Fragment>
              );
            })}
          </Grid>
          <Grid container justifyContent='center' alignItems='center' className='paginationDiv'>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) => handlePageClick(e)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
            </Grid>
        </div>)}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pokedex: state.pokedex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pokedexList: (limit, offset) => dispatch(pokedexList(limit, offset)),
    pokedexDetail: (url) => dispatch(pokedexDetail(url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokedexList);
