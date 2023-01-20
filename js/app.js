// let startingString = "";
// const buttons = document.querySelectorAll(".btn");
// const inputField = document.querySelector("input");

// console.log(buttons);
// console.log(buttons);

// let allButtonArr = Array.from(buttons);

// allButtonArr.map(button => {
//   button.addEventListener("click", e => {
//     if (e.target.innerHTML == "=") {
//       startingString = eval(startingString);
//       console.log(startingString);
//       setInputFiled(startingString);
//       return;
//     } else if (e.target.innerHTML == "C") {
//       startingString = "";
//       setInputFiled(startingString);
//       return;
//     } else if (e.target.innerHTML.length >= 5) {
//       console.log(startingString);
//       startingString = startingString.substring(0, startingString.length - 1);
//       setInputFiled(startingString);
//       return;
//     } else if (startingString == undefined) {
//       startingString = "";
//     }
//     startingString += e.target.innerHTML;
//     setInputFiled(startingString);
//     console.log(e.target.innerHTML);
//   });
// });

// const setInputFiled = string => {
//   if (string !== undefined) {
//     inputField.value = string;
//   } else {
//     inputField.value = "";
//   }
// };
// event.currentTarget refers to the element that the listener was bound to.
// Here in the demo we can see if we do actually click the div (possible because of enormous padding) the the match evaluator e.target === e.currentTarget is in fact true.

//to remove the many (42) event listeners we are doing this (same as react).

let simpleCalString = "";

const array = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "/",
  "*",
  // "^",
  "%",
  "(",
  ")",
];
const inputField = document.querySelector("input");
const mainElementForEvents = document.querySelector("#calculator-div");

//only one main event listener for all the btn.
mainElementForEvents.addEventListener("click", btnClickHandler);

function btnClickHandler(e) {
  if (e.target != e.currentTarget) {
    console.log(simpleCalString);
    var clickedItem = e.target.id;
    console.log(clickedItem);
    switch (clickedItem) {
      case isOperationPresent(clickedItem):
        simpleCalculation(clickedItem);
        break;
      case "=":
        calculationOfSimpleCal(simpleCalString);
        break;
      case "remove-char":
        removeCharFromCal(simpleCalString);
        break;
      case "reset-char":
        simpleCalString = "";
        setCharAtInputField(simpleCalString);
        break;
      case "^2":
        powerCal(simpleCalString);
        break;
      case "10sqrt":
        powerCal(10, simpleCalString);
        break;
      case "sqrt":
        sqrtCal(simpleCalString);
        break;
      case "pi":
        const pi = eval("22/7");
        setCharAtInputField(pi);
        break;
      case "1/x":
        oneByXCal(simpleCalString);
        break;
      case "abs":
        absCal(simpleCalString);
        break;
      default:
        break;
    }
  }
}

function isOperationPresent(clickedItem) {
  if (array.includes(clickedItem)) {
    return clickedItem;
  } else {
    return "Not-Present";
  }
}

function calculationOfSimpleCal() {
  simpleCalString = eval(simpleCalString);
  setCharAtInputField(simpleCalString);
}

function simpleCalculation(string) {
  if (simpleCalString == undefined) simpleCalString = "";
  simpleCalString += string;
  setCharAtInputField(simpleCalString);
}

function removeCharFromCal(string) {
  string = string.substring(0, string.length - 1);
  simpleCalString = string;
  setCharAtInputField(simpleCalString);
}

function powerCal(string, power = 2) {
  simpleCalString = Math.pow(string, power);
  setCharAtInputField(simpleCalString);
}

function sqrtCal(simpleCalString) {
  simpleCalString = Math.sqrt(simpleCalString);
  if (isNaN(simpleCalString)) {
    window.alert("Please enter the valid input!");
    simpleCalString = "";
  }
  setCharAtInputField(simpleCalString);
}

function oneByXCal(string) {
  if (string == "0" || string == "")
    return window.alert("Please enter the valid input");
  let result = parseFloat(1 / string).toPrecision(2);
  if (isNaN(result) || result == "infinity") {
    window.alert("Please enter the valid input!");
    simpleCalString = "";
  }
  simpleCalString = result;
  setCharAtInputField(result);
}

function absCal(string) {
  simpleCalString = Math.abs(string);
  setCharAtInputField(simpleCalString);
}

function setCharAtInputField(string) {
  if (string == undefined) {
    inputField.value = "";
    return;
  }
  inputField.value = string;
}
