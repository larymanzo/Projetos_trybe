import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      showButton: true,
      loged: false,
      promiseResult: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    // valor e nome do state vão ser o target
    const { name, value } = target;
    const NAME_LOGIN = 3;
    // o nome da target vai receber o valor passado pra dentro dele.
    this.setState({ [name]: value });
    // se o valor passado pra dentro do nome for >= a 3, o showButton vai mudar para falso
    if (value.length >= NAME_LOGIN) {
      (this.setState({ showButton: false }));
    // senao o showButton vai mudar para true
    } else {
      (this.setState({ showButton: true }));
    }
  }

  // referência Bel Albuquerque
  // onClick vai ser uma função asincrona
  onclick = async () => {
    // pegando as variáveis 'loged, loginName' do state
    const { loged, loginName } = this.state;
    // definindo que o valor passado para loged agora vai ser a negação do que estava antes
    this.setState((prevState) => ({ loged: !prevState[loged] }));
    // definindo o user como o objeto => {name: loginName(o que foi passado)}
    const user = { name: loginName };
    // vai esperar o retorno da api userAPI e vai passar name para o objeto dentro de createUser
    await createUser(user);
    // vai setar o estado da promiseResult como true
    this.setState({
      promiseResult: true,
    });
  };

  render() {
    const { loginName, showButton, loged, promiseResult } = this.state;
    return (
      <section>
        {/* referência Bel Albuquerque */}
        {/* quando a promiseResult for true, vai direcionar para a pagina search */}
        { promiseResult && <Redirect to="/search" /> }
        <form data-testid="page-login">
          <label htmlFor="loginName">
            Nome
            <input
              value={ loginName }
              type="text"
              name="loginName"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ showButton }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.onclick }
          >
            Entrar
          </button>
        </form>
        {/* referência Bel Albuquerque */}
        {/* enquanto for estiver carregando a api, se o loged for true, vai aparecer na tela Carregando... */}
        { loged && <Loading />}
      </section>
    );
  }
}

export default Login;
