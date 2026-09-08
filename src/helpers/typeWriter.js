import delay from "./delay";

async function typeWriter(element, text, speed = 35) {
  element.textContent = "";
  element.classList.add("typing");

  for (const character of text) {
    element.textContent += character;
    await delay(speed);
  }

  element.classList.remove("typing");
}

export default typeWriter;
