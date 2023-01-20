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
// const secondOptionBtn = document.getElementById("#second-fn-trigger");

// secondOptionBtn.addEventListener('click', () => {});

//only one main event listener for all the btn (event delegation)
mainElementForEvents.addEventListener("click", btnClickHandler);

function btnClickHandler(e) {
  //currentTarget --> element that the listener was bound to.
  //target --> on we do actually click
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
      case "10sq":
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
      case "factorial":
        factorialOfNCal(simpleCalString);
        break;
      case "second-fn-trigger":
        secondBtnTriggerForToggle();
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

function secondBtnTriggerForToggle() {
  const allBtnForToggle = document.getElementsByClassName("2nd-toggle-btn");
  Array.from(allBtnForToggle).map(visibleBtn => {
    //visibleBtn ==> DOMTokenList
    if (visibleBtn.classList.contains("d-inline")) {
      visibleBtn.classList.toggle("d-none");
    } else {
      visibleBtn.classList.toggle("d-none");
    }
  });
}

function showErrForSomeTime(string) {
  document.getElementById("error-div").innerHTML = string;
  setTimeout(() => {
    document.getElementById("error-div").innerHTML = "";
  }, 5000);
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
    showErrForSomeTime("Please enter the valid input!");
    simpleCalString = "";
  }
  setCharAtInputField(simpleCalString);
}

function oneByXCal(string) {
  if (string == "0" || string == "")
    return showErrForSomeTime("Please enter the valid input");
  let result = parseFloat(1 / string).toPrecision(2);
  if (isNaN(result) || result == "infinity") {
    showErrForSomeTime("Please enter the valid input!");
    simpleCalString = "";
  }
  simpleCalString = result;
  setCharAtInputField(result);
}

function absCal(string) {
  simpleCalString = Math.abs(string);
  setCharAtInputField(simpleCalString);
}

//fn to
function factorialOfNCal(string) {
  var answer = 1;
  for (i = 1; i <= parseInt(string); i++) {
    answer = answer * i;
    console.log(answer);
  }
  simpleCalString = answer;
  setCharAtInputField(simpleCalString);
}

//fn to set the string in the input field
function setCharAtInputField(string) {
  if (string == undefined) {
    inputField.value = "";
    return;
  }
  inputField.value = string;
}
