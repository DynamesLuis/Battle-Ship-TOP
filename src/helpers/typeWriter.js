import delay from "./delay";

async function typeWriter(element, text, speed = 35) {
  element.textContent = '"';
  element.classList.add("typing");

  element.textContent
  for (const character of text) {
    element.textContent += character;
    await delay(speed);
  }

  element.textContent += '"';

  element.classList.remove("typing");
}

export default typeWriter;
