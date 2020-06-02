import mrRobotQuotes from "./robotquotes.js";

const robot = new p5.Speech(); // speech synthesis object

// make a function for generating the quote on click
const generateQuote = () => {
  //create a p element for the text and append it to the container element
  document.getElementById("textWrapper").innerHTML = "";
  let quoteContainer = document.createElement("p");
  let span = document.createElement("span");
  document.getElementById("textWrapper").appendChild(quoteContainer);
  document.getElementById("textWrapper").appendChild(span);

  //randomly select a quote from the array
  let randSelect =
    mrRobotQuotes[Math.floor(Math.random() * mrRobotQuotes.length - 1)];
  //Put the randomly selected quote in the p element in quotation marks
  let text = document.createTextNode(`"${randSelect}" `);
  let author = document.createTextNode("AI Author 2020");
  quoteContainer.appendChild(text);
  span.appendChild(author);

  robot.speak(randSelect);
};

// function to remove the previous quote generated/clear the container
const removePrev = () => {
  if (quoteContainer) {
    quoteContainer.parentNode.removeChild(quoteContainer);
  }
};

let button = document.getElementById("button");
button.addEventListener("click", generateQuote);

// Making the information appear on hover, and disappear when not hovering
let e = document.getElementById("iconContainer");
e.onmouseover = function () {
  document.getElementById("hoverBox").style.display = "block";
};
e.onmouseout = function () {
  document.getElementById("hoverBox").style.display = "none";
};
