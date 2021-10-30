import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    this.setState({
      loading: true,
    });
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({
      loading: false,
      name,
      email,
      image,
      description,
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div>
        <h3>Perfil</h3>
        { loading && <Loading /> }
        <section data-testid="page-profile">
          <Link to="/profile/edit">Editar perfil</Link>
          <img data-testid="profile-image" alt="Foto de perfil" src={ image } />
          <p>{ name }</p>
          <p>{ email }</p>
          <p>{ description }</p>
        </section>
      </div>
    );
  }
}

export default Profile;
