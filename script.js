const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    try {
      // Convert percent occurrences (e.g. 50% -> (50/100))
      const sanitized = output.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
      // Use Function constructor instead of eval for a tiny safety improvement
      // this still evaluates simple math expressions only.
      // Allowed characters: digits, operators, parentheses, dot
      if (/^[0-9()+\-*/.\s]+$/.test(sanitized)) {
        // eslint-disable-next-line no-new-func
        const result = Function(`return ${sanitized}`)();
        output = String(result);
      } else {
        output = "";
      }
    } catch (err) {
      output = ""
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    //If DEL button is clicked, remove the last character from the output.
    output = output.toString().slice(0, -1);
  } else {
    //If output is empty and button is specialChars then return
    if (output === "" && specialChars.includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
  //Button click listener calls calculate() with dataset value as argument.
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});