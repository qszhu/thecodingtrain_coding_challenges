const rules = {
  S: [
    ["NP", "VP"],
    ["Interj", "NP", "VP"],
  ],
  NP: [
    ["Det", "N"],
    ["Det", "N", "that", "VP"],
    ["Det", "Adj", "N"],
  ],
  VP: [["Vtrans", "NP"], ["Vintr"]],
  Interj: [["oh"], ["my"], ["wow"], ["darn"]],
  Det: [["this"], ["that"], ["the"]],
  N: [
    ["amoeba"],
    ["dichotomy"],
    ["seagull"],
    ["trombone"],
    ["overstaffed"],
    ["corsage"],
  ],
  Adj: [
    ["bald"],
    ["smug"],
    ["important"],
    ["tame"],
    ["overstaffed"],
    ["corsage"],
  ],
  Vtrans: [["computes"], ["examines"], ["foregrounds"]],
  Vintr: [["coughs"], ["daydreams"], ["whines"]],
};

function expand(start, expansion) {
  if (rules[start]) {
    const pick = random(rules[start]);
    for (let i = 0; i < pick.length; i++) {
      expand(pick[i], expansion);
    }
  } else {
    expansion.push(start);
  }
  return expansion.join(" ");
}

let button;

function setup() {
  noCanvas();
  button = createButton("generate");
  button.mousePressed(cfg);
}

function cfg() {
  const start = "S";
  const expansion = [];
  const result = expand(start, expansion);
  createP(result);
}
