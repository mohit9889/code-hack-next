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
  const now = new Date();
  const diff = now - date;

  // Check if the difference is less than or equal to a month
  if (diff <= 30 * 24 * 60 * 60 * 1000) {
    // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const days = Math.floor(diff / (24 * 60 * 60 * 1000)); // Convert difference to days
    if (days === 0) {
      // Less than a day
      const hours = Math.floor(diff / (60 * 60 * 1000)); // Convert difference to hours
      if (hours === 0) {
        // Less than an hour
        const minutes = Math.floor(diff / (60 * 1000)); // Convert difference to minutes
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      }
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (days === 1) {
      return "1 day ago";
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (days < 14) {
      return "1 week ago";
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      return `${weeks} weeks ago`;
    }
  }

  // If more than a month, format the date
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
