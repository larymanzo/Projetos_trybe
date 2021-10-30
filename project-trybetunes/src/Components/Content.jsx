import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Content extends React.Component {
  // referência Izabela Guarino
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    // pega as informaçoes que foram passadas pra api atraves do login
    // seta um novo estado acessando o data.name e atribuindo para o name
    getUser().then((data) => this.setState({
      name: data.name,
      loading: false,
    }));
  }

  render() {
    const { loading, name } = this.state;
    return (
      <nav>
        <Link to="/">Login</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/profile/edit">Editar Perfil</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        {/* Referência Izabela Guarino */}
        {/* quando loading for true, vai aparecer a pagina de loading */}
        {/* quando loading for falso, vai aparecer a propriedade name do state */}
        {loading ? <Loading /> : (<p data-testid="header-user-name">{ name }</p>)}
      </nav>
    );
  }
}
export default Content;
