class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 25;
    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket());
    }
  }

  evaluate() {
    const maxfit = Math.max(...this.rockets.map((r) => r.fitness));
    this.matingpool = [];
    for (const rocket of this.rockets) {
      const n = (rocket.fitness / maxfit) * 100;
      for (let i = 0; i < n; i++) {
        this.matingpool.push(rocket);
      }
    }
  }

  selection() {
    const newRockets = [];
    for (let i = 0; i < this.popsize; i++) {
      const parentA = random(this.matingpool).dna;
      const parentB = random(this.matingpool).dna;
      const child = parentA.crossover(parentB);
      child.mutation();
      newRockets.push(new Rocket(child));
    }
    this.rockets = newRockets;
  }

  run() {
    for (const rocket of this.rockets) {
      rocket.update();
      rocket.show();
    }
  }
}
