class Parser {
  constructor(text) {
    this.text = text;
    this.index = 0;
  }

  eof() {
    return this.index >= this.text.length;
  }

  ignoreSpaces() {
    while (!this.eof() && this.text[this.index] === " ") this.index++;
  }

  nextToken() {
    this.ignoreSpaces();
    let p = this.index;
    while (p < this.text.length && this.text[p] !== " ") p++;
    const token = this.text.substring(this.index, p);
    this.index = p;
    return token;
  }

  parse() {
    let commands = [];
    let movement = /^([fb]d|[lr]t)$/;
    let pen = /^p/;
    // let repeat = /^repeat$/;
    while (!this.eof()) {
      let token = this.nextToken();
      if (movement.test(token)) {
        let cmd = new Command(token, Number(this.nextToken()));
        commands.push(cmd);
      } else if (pen.test(token)) {
        let cmd = new Command(token);
        commands.push(cmd);
      }
    }
    return commands;
  }
}
