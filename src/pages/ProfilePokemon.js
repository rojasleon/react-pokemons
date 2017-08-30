import React, { Component } from 'react';
import api from '../services/api';
import Profile from '../components/Profile';
import Loading from '../components/shared/Loading';
import Footer from '../components/shared/Footer';
import PropTypes from 'prop-types';
import Type from '../components/Type';

export default class ProfilePokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: {},
      loading: true,
    };
  }

  async componentDidMount() {
    const pokemons = await api.pokemons.getPokemons(this.props.match.params.id);

    if(!pokemons) {
      return null;
    }

    this.setState({
      pokemons,
      loading: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Loading /> : (
          <div>
            <Profile pokemonData={this.state.pokemons} />
          </div>
        )}
        {this.state.pokemons.types && (
          <div>
            {this.state.pokemons.types.map((type, index) => {
              return <Type key={index} {...type} />
            })}
          </div>
        )}
        {this.state.pokemons.detail && <h2 className="is-size-4 has-text-danger">Pokemon no encontrado "{this.props.match.params.id}"</h2>}
        <Footer />
      </div>
    )
  }
}

ProfilePokemon.propTypes = {
  pokemons: PropTypes.object,
  loading: PropTypes.bool,
}
