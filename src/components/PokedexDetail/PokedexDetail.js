import React from 'react';
import Grid from '@material-ui/core/Grid';
import './PokedexDetail.css';

const PokedexDetail = (props) => {
  const details = props.pokemonDetailList;
  const abilityList = details.abilities.map(({ ability }) => ability.name[0].toUpperCase() + ability.name.slice(1));
  const statsList = details.stats.map(({ stat }) => stat.name[0].toUpperCase() + stat.name.slice(1));
  const movesList = details.moves.map(({ move }) => move.name[0].toUpperCase() + move.name.slice(1));
  const imageUrl = details.id > 999 ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + details.id + '.png' : 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' +String(details.id).padStart(3, '0') + '.png';
  return (
    <div>
      <div className='backButton' onClick={() => props.closePokedexDetails()}>Back</div>
      <Grid container justifyContent='center' alignItems='center' className="pokemonDetailGrid">
      <Grid item xs={12} md={6} className='imageGrid'>
        <div className="imageDiv"> <img src={imageUrl} alt='pokemonImage'/></div>
      </Grid>
      <Grid item xs={12} md={6} className='detailGrid'>
        <Grid container>
        <Grid item xs={12} md={6}>
            <div className='detailLabel'>Height</div>
            <div className='detailValue'>{details.height}</div>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className='detailLabel'>Weight</div>
            <div className='detailValue'>{details.weight} lbs</div>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className='detailLabel'>Abilities</div>
            <div className='detailValue'>{abilityList.join(', ')}</div>
        </Grid>
        <Grid item xs={12} md={6}>
            <div className='detailLabel'>Stats</div>
            <div className='detailValue'>{statsList.join(', ')} </div>
        </Grid>
        <Grid item xs={12}>
            <div className='detailLabel'>Moves</div>
            <div className='detailValue'>{movesList.join(', ')} </div>
        </Grid>
        </Grid>
      </Grid>
      </Grid>
    </div>
  );
}

export default PokedexDetail;
