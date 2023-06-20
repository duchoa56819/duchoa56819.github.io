function encode() {
  const inputText = document.getElementById("inputText").value;
  const encodedText = caesarCipher(inputText, 1); // Shifts each character by 1 position
  document.getElementById("encodedText").value = encodedText;
}

function caesarCipher(text, shift) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      charCode = ((charCode - 65 + shift) % 26) + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      charCode = ((charCode - 97 + shift) % 26) + 97;
    }

    result += String.fromCharCode(charCode);
  }

  return result;
}