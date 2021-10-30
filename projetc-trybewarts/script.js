const button = document.getElementById('button');
const checkbox = document.getElementById('agreement');

function login() {
  const login2 = document.getElementById('login');
  const senha = document.getElementById('senha');

  if (login2.value === 'tryber@teste.com' && senha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Login ou senha inválidos.');
  }
}

function buttonSelecinado() {
  const submit = document.getElementById('submit-btn');
  if (checkbox.checked) {
    submit.removeAttribute('disabled');
  } else {
    submit.setAttribute('disabled', 'disabled');
  }
}

button.addEventListener('click', login);
checkbox.addEventListener('click', buttonSelecinado);
