// declarar uma variável para table
const table = document.querySelector('#pixel-board');

// criar a largura e a altura
const largura = 5;
const altura = 5;

// criar table com tr e th
for (let index = 0; index < largura; index += 1) {
  const coluna = document.createElement('tr');
  table.appendChild(coluna);
  for (let index2 = 0; index2 < altura; index2 += 1) {
    const linhas = document.createElement('th');
    coluna.appendChild(linhas);
    linhas.className = 'pixel';
    linhas.style.backgroundColor = 'white';
  }
}

// função para randomizar as cores
function generateColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;

  return `rgba(${r} ${g} ${b})`;
}

// declarar uma variável para section
const section = document.getElementById('color-palette');

// criar divs com a classe color
for (let index = 0; index < 3; index += 1) {
  const linha = document.createElement('div');
  section.appendChild(linha);
  linha.className = 'color';
  linha.style.backgroundColor = generateColor();
}

// pega todos os filhos do elemento com ID color-pallete
const section1 = document.getElementById('color-palette').children;

// adiciona a classe selected na primeira div(no caso é preto)
section1[0].classList.add('selected');

// seleciona as classes selected e remove o selected que estava em outro quadrado
function selectColor(event) {
  // localização de onde foi clicado
  const clickColor = event.target;
  // pega todos os elementos com a classe selected
  const listSelected = document.getElementsByClassName('selected');

  // verifica se tem a classe selected
  if (clickColor.classList.contains('selected')) {
    //  empty
  } else {
    // remove o selected que estava em outra div e adiciona na que está agora
    listSelected[0].classList.remove('selected');
    clickColor.classList.add('selected');
  }
}

// percorre as divs que estão no ID color-pallete(section1)
for (let index = 0; index < section1.length; index += 1) {
  // adiciona o evento click e chama a função selectColor
  section1[index].addEventListener('click', selectColor);
}

const tablePixel = document.getElementsByTagName('th');

//  seleciona as classe pixel e adiciona uma classe
function selectPixel(event) {
  const clickPixel = event.target;
  const classSelected = document.getElementsByClassName('selected')[0];

  if (clickPixel.style.backgroundColor !== classSelected.style.backgroundColor) {
    clickPixel.style.backgroundColor = classSelected.style.backgroundColor;
  }
}

for (let index = 0; index < tablePixel.length; index += 1) {
  tablePixel[index].addEventListener('click', selectPixel);
}

function clearPixel() {
  for (let index = 0; index < tablePixel.length; index += 1) {
    tablePixel[index].style.backgroundColor = 'white';
  }
}

const button = document.getElementById('clear-board');

button.addEventListener('click', clearPixel);
