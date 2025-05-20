// Typing Effect
const text = "Yashasvi Pandey";
let index = 0;
function type() {
  const typingElement = document.getElementById("name-type");
  if (typingElement && index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 120);
  }
}
window.onload = type;
