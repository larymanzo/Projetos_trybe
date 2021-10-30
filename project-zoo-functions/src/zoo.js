const data = require('./data');
const { species, employees, prices, hours } = require('./data');

function getSpeciesByIds(...ids) {
  // quando retorna true, pega o elemento da vez.
  // no caso seria o objeto com id igual ao id passado.
  return species.filter((specie) => ids.includes(specie.id));
}

function getAnimalsOlderThan(animal, ages) {
  const litleAnimal = species.find((specie) => specie.name === animal);
  return litleAnimal.residents.every((resident) => ages <= resident.age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return (employees.find(
    (employee) => employeeName === employee.firstName || employeeName === employee.lastName,
  )
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// função feita pela com ajuda da colega Grasiela Gomes - Tuma 14 B
function isManager(id) {
  // define um array vazio de nome managersList.
  const managersList = [];
  // para cada elemento do array employees, vai adicionar no array managersList o que estiver no employee.managers.
  // ou seja, vai adicionar os nomes dos managers(gerentes) no array managersList.
  employees.forEach((employee) => managersList.push(...employee.managers));
  // se o id for igual a um dos elementos do array manager, ele retorna true.
  return managersList.some((manager) => id === manager);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// exercício feito com ajuda do Alef Sloan - Turma 13 - B
function countAnimals(specieName) {
  const arrayAllAnimals = {};
  // caso não seja passado nenhum parametro.
  if (typeof specieName === 'undefined') {
    // vai percorrer o array species.
    species.forEach((elements) => {
      // para cada objeto no name, ele vai colocar o tamanho do objeto residents.
      arrayAllAnimals[elements.name] = elements.residents.length;
    });
    // vai retornar o novo array feito dentro do forEach.
    return arrayAllAnimals;
  }
  // acha o primeiro nome que é igual ao que está no objeto na chave name
  const specieAnimal = species.find((specie) => specie.name === specieName);
  // retorna o tamanho do array residents.
  return specieAnimal.residents.length;
}

function calculateEntry(entrants) {
  // caso não tenha entrada, ou seja, o tamanho é = 0 ou é undefined, retorna 0.
  if (entrants === undefined) {
    return 0;
  }
  const objEntrants = Object.entries(entrants);
  // caso tenha entrada, vai percorrer os valores dessa entrada.
  // retornando o acumulador iniciando igual a 0, somando ao price passado * valor que é passado em cada entrada.
  return objEntrants
    .reduce((accumulator, [entrant, value]) => accumulator + prices[entrant] * value, 0);
}

function getAnimalMap(options) {
  // if (!options) {
  //   return species.map((specie) => {
  //     return species.location.sort((a, b) => {
  //       return a - b;
  //     })
  //   })
  // }
}

// exercício feito com ajuda do Alef Sloan - Turma 13 - B
function getSchedule(dayName) {
  // pegando apenas as keys do objeto hours(Tuesday, Wednesday etc) e colocando em uma variável.
  const hourKey = Object.keys(hours);
  // definindo um objeto vazio para mostrar as mensagens dos horários.
  const humanMessage = {};
  hourKey.forEach((hour) => {
    const response = `Open from ${(hours[hour].open)}am until ${(hours[hour].close) - 12}pm`;
    if (hour === 'Monday') {
      humanMessage[hour] = 'CLOSED';
    } else {
      humanMessage[hour] = response;
    }
  });
  if (dayName === undefined) {
    return humanMessage;
  }
  return {
    [dayName]: humanMessage[dayName],
  };
}

function getOldestFromFirstSpecies(id) {
  // acha o primeiro employee com o mesmo id do passado;
  // pega o primeiro animal responsável e armazena em uma variável;
  const animalEmployee = employees.find((employee) => employee.id === id).responsibleFor[0];
  // retorna: o valor da chave encontrada dentro do objeto species que tenha o mesmo id do encontrado na linha anterior,
  // pega os valores dentro da chave residents,
  // ordena por idade decrescente e pega o valor da primeira posição.
  return Object.values(species.find((specie) => specie.id === animalEmployee)
    .residents.sort((a, b) => b.age - a.age)[0]);
}

// feito com a ajuda do colega Lucas Accurcio.
function increasePrices(percentage) {
  const percentageNow = (percentage / 100) + 1;
  prices.Adult = Math.round((prices.Adult * percentageNow) * 100) / 100;
  prices.Senior = Math.round((prices.Senior * percentageNow) * 100) / 100;
  prices.Child = Math.round((prices.Child * percentageNow) * 100) / 100;
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
