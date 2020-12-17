function calculateFitness() {
  let currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    const d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    fitness[i] = 1 / (pow(d, 8) + 1);
  }
}

function normalizeFitness() {
  let sum = fitness.reduce((acc, val) => acc + val, 0);
  fitness = fitness.map((f) => f / sum);
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    const orderA = pickOne(population, fitness);
    const orderB = pickOne(population, fitness);
    const order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation.push(order);
  }
  population = newPopulation;
}

function pickOne(list, prob) {
  let idx = 0;
  let r = random(1);
  while (r > 0) {
    r = r - prob[idx++];
  }
  if (idx > 0) idx--;
  return list[idx].slice();
}

function crossOver(orderA, orderB) {
  const start = floor(random(orderA.length));
  const end = floor(random(start + 1, orderA.length));
  const neworder = orderA.slice(start, end);
  for (let i = 0; i < orderB.length; i++) {
    const city = orderB[i];
    if (!neworder.includes(city)) neworder.push(city);
  }
  return neworder;
}

function mutate(order, mutationRate) {
  for (let i = 0; i < totalCitites; i++) {
    if (random(1) < mutationRate) {
      const idxA = floor(random(order.length));
      const idxB = (idxA + 1) % totalCitites;
      swap(order, idxA, idxB);
    }
  }
}
