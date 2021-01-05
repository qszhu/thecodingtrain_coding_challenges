let afinn;

function preload() {
  afinn = loadJSON("afinn111.json");
}

function setup() {
  noCanvas();

  const txt = select("#txt");
  txt.input(typing);

  function typing() {
    const textinput = txt.value();
    const words = textinput.split(/\W/);
    const scoredwords = [];
    let totalScore = 0;
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      if (afinn.hasOwnProperty(word)) {
        const score = afinn[word];
        totalScore += Number(score);
        scoredwords.push(`${word}: ${score} `);
      }
    }

    const scoreP = select("#scoreP");
    scoreP.html(`score: ${totalScore}`);

    const comp = select("#comparativeP");
    comp.html(`comparative: ${totalScore / words.length}`);

    const wordlistP = select("#wordlistP");
    wordlistP.html(scoredwords);
  }
}
