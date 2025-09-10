export class BTreeNode {
  keys: number[];
  children: BTreeNode[];
  isLeaf: boolean;

  constructor(public t: number, isLeaf = true) {
    this.t = t;
    this.isLeaf = isLeaf;
    this.keys = [];
    this.children = [];
  }

  insertNonFull(k: number, steps: string[]) {
    let i = this.keys.length - 1;
    steps.push(`Start insertion of ${k}.`);
    if (this.isLeaf) {
      while (i >= 0 && k < this.keys[i]) i--;
      this.keys.splice(i + 1, 0, k);
      steps.push(`Inserted ${k} into leaf node.`);
    } else {
      while (i >= 0 && k < this.keys[i]) i--;
      i++;
      steps.push(`Going to child index ${i} to insert ${k}.`);
      if (this.children[i].keys.length === 2 * this.t - 1) {
        steps.push(`Child ${i} is full; need to split.`);
        this.splitChild(i, steps);
        if (k > this.keys[i]) i++;
      }
      this.children[i].insertNonFull(k, steps);
    }
  }

  splitChild(i: number, steps: string[]) {
    const t = this.t;
    const y = this.children[i];
    const z = new BTreeNode(t, y.isLeaf);
    z.keys = y.keys.splice(t);
    const mid = y.keys.pop();
    this.keys.splice(i, 0, mid!);
    this.children.splice(i + 1, 0, z);
    steps.push(`Split node and promoted ${mid} to parent.`);
  }

  findAndUpdate(k: number, newVal: number, steps: string[]): boolean {
    let i = 0;
    while (i < this.keys.length && k > this.keys[i]) i++;
    if (i < this.keys.length && this.keys[i] === k) {
      steps.push(`Found key ${k}, updating to ${newVal}.`);
      this.keys[i] = newVal;
      return true;
    }
    if (this.isLeaf) return false;
    return this.children[i].findAndUpdate(k, newVal, steps);
  }

  findAndRemove(k: number, steps: string[]): boolean {
    let i = 0;
    while (i < this.keys.length && k > this.keys[i]) i++;
    if (i < this.keys.length && this.keys[i] === k) {
      steps.push(`Found key ${k} in node, removing.`);
      this.keys.splice(i, 1);
      return true;
    }
    if (this.isLeaf) return false;
    return this.children[i].findAndRemove(k, steps);
  }
}

export class BTree {
  root: BTreeNode | null = null;
  t: number;

  constructor(t: number) {
    this.t = t;
  }

  insert(k: number): string[] {
    const steps: string[] = [];
    if (!this.root) {
      this.root = new BTreeNode(this.t, true);
      this.root.keys.push(k);
      steps.push(`Created root and inserted ${k}.`);
    } else {
      if (this.root.keys.length === 2 * this.t - 1) {
        const s = new BTreeNode(this.t, false);
        s.children.push(this.root);
        s.splitChild(0, steps);
        this.root = s;
        this.root.insertNonFull(k, steps);
      } else {
        this.root.insertNonFull(k, steps);
      }
    }
    return steps;
  }

  update(k: number, newVal: number): string[] {
    const steps: string[] = [];
    if (!this.root) {
      steps.push("Tree is empty.");
      return steps;
    }
    if (!this.root.findAndUpdate(k, newVal, steps)) {
      steps.push(`Key ${k} not found.`);
    }
    return steps;
  }

  remove(k: number): string[] {
    const steps: string[] = [];
    if (!this.root) {
      steps.push("Tree is empty.");
      return steps;
    }
    if (!this.root.findAndRemove(k, steps)) {
      steps.push(`Key ${k} not found.`);
    }
    return steps;
  }
}
