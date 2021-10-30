const list = document.getElementById('lista-tarefas');
const button = document.getElementById('criar-tarefa');

function createList() {
  const text = document.getElementById('texto-tarefa');
  const listOrd = document.createElement('li');

  if (text.value !== '') {
    listOrd.innerText = text.value;
    list.appendChild(listOrd);
  }
  text.value = '';
}

button.addEventListener('click', createList);

function setColor(event) {
  const clickColor = event.target;
  const listPaint = document.getElementsByClassName('paint');
  if (clickColor.classList.contains('paint')) {
    // não irá fazer nada
  } else if (listPaint.length === 0) {
    clickColor.classList.add('paint');
  } else {
    listPaint[0].classList.remove('paint');
    clickColor.classList.add('paint');
  }
}

list.addEventListener('click', setColor);

function setDobleClick(event) {
  const clickDB = event.target;

  if (clickDB.classList.contains('completed')) {
    clickDB.classList.remove('completed');
  } else {
    clickDB.classList.add('completed');
  }
}

list.addEventListener('dblclick', setDobleClick);
