export const languages = [
  {
    name: "JavaScript",
    icon: "icons/language/javascript.svg",
  },
];

export const themes = ["monokai"];

export const backgrounds = ["linear-gradient(to right, #8360c3, #2ebf91)"];

export const initialCode = `
// Write or Paste your code! 
function guessMyNumber() {
  const userGuess = prompt("Guess a number between 1 and 10:");
  const secretNumber = Math.ceil(Math.random() * 10);

  if (parseInt(userGuess) === secretNumber) {
    return "Wow, you must be a psychic!";
  } else {
    return \`Nope, the number was \${secretNumber}. Better luck next time!\`;
  }
}

console.log(guessMyNumber());`;

export const tabs = [
  { link: "hot", title: "Hot" },
  { link: "new", title: "New" },
  { link: "top", title: "Top" },
];

export const getTrickURL = (title, id) => {
  const processedTitle = title.replace(/\s+/g, "-").replace(/[^\w\s]/gi, "-");
  const result = `${processedTitle}-${id}`;

  return result;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
