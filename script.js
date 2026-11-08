// Asks the user for a number and keeps asking until the input is valid
function getNumberInput(message) {
  let answer;   // declared outside the loop so the while condition can use it
  let value;

  do {
    answer = prompt(message);

    // User clicked Cancel: treat as 0 so the app does not crash
    if (answer === null) {
      return 0;
    }

    value = Number(answer);
  } while (answer.trim() === "" || isNaN(value) || value < 0);

  return value;
}
