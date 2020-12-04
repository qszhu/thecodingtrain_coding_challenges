function newGene() {
  const gene = p5.Vector.random2D();
  gene.setMag(maxforce);
  return gene;
}

class DNA {
  constructor(genes) {
    this.genes = genes || new Array(lifespan).fill().map(newGene);
  }

  crossover(partner) {
    const newgenes = [];
    const mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      newgenes[i] = i > mid ? this.genes[i] : partner.genes[i];
    }
    return new DNA(newgenes);
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = newGene();
      }
    }
  }
}
