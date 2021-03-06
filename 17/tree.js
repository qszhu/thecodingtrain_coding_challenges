class Tree {
  constructor() {
    this.leaves = [];
    this.branches = [];

    for (let i = 0; i < 1500; i++) {
      this.leaves.push(new Leaf());
    }

    const pos = createVector(width / 2, height);
    const dir = createVector(0, -1);
    const root = new Branch(null, pos, dir);
    this.branches.push(root);

    let current = root;
    let found = false;
    while (!found) {
      found = this.leaves.some(
        (leaf) => p5.Vector.dist(current.pos, leaf.pos) < max_dist
      );
      if (!found) {
        current = current.next();
        this.branches.push(current);
      }
    }
  }

  grow() {
    for (const leaf of this.leaves) {
      let closestBranch = null;

      let res = this.branches
        .map((branch) => [branch, p5.Vector.dist(leaf.pos, branch.pos)])
        .filter(([b, d]) => d < max_dist)
        .sort(([b1, d1], [b2, d2]) => d1 - d2);

      if (res.length > 0) {
        let closestDist;
        [closestBranch, closestDist] = res[0];
        if (closestDist < min_dist) {
          leaf.reached = true;
          closestBranch = null;
        }
      }

      if (closestBranch) {
        const newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
      }
    }

    this.leaves = this.leaves.filter((leaf) => !leaf.reached);

    this.branches = this.branches.reduce((res, branch) => {
      res.push(branch);
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        res.push(branch.next());
        branch.reset();
      }
      return res;
    }, []);
  }

  show() {
    for (const leaf of this.leaves) {
      leaf.show();
    }
    for (const branch of this.branches) {
      branch.show();
    }
  }
}
