const encodingMap = {
  a: "q",
  b: "w",
  c: "e",
  d: "r",
  e: "t",
  f: "y",
  g: "u",
  h: "i",
  i: "o",
  j: "p",
  k: "a",
  l: "s",
  m: "d",
  n: "f",
  o: "g",
  p: "h",
  q: "j",
  r: "k",
  s: "l",
  t: "z",
  u: "x",
  v: "c",
  w: "v",
  x: "b",
  y: "n",
  z: "m",
};

function encode() {
  const inputText = document.getElementById("inputText").value;
  const encodedText = substitutionEncode(inputText);
  document.getElementById("outputText").value = encodedText;
}

function decode() {
  const inputText = document.getElementById("inputText").value;
  const decodedText = substitutionDecode(inputText);
  document.getElementById("outputText").value = decodedText;
}

function substitutionEncode(text) {
  let encodedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const encodedChar = encodingMap[char] || char;
    encodedText += encodedChar;
  }

  return encodedText;
}

function substitutionDecode(text) {
  let decodedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const decodedChar = Object.keys(encodingMap).find(
      (key) => encodingMap[key] === char
    ) || char;
    decodedText += decodedChar;
  }

  return decodedText;
}

function copyOutput() {
  const outputText = document.getElementById('outputText');
  outputText.select();
  outputText.setSelectionRange(0, 99999); // For mobile devices
  document.execCommand('copy');
  alert('Copied to clipboard!');
}





