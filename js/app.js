let simpleCalString = "";
Number.prototype.factorial = function () {
  return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
};
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
  ".",
  "+",
  "-",
  "/",
  "*",
  "**",
  "!",
  "**2",
  "**3",
  "%",
  "rt",
  "(",
  ")",
  "e",
  "π",
  "log",
  "ln",
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
    console.log(simpleCalString, "sstrign");
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
      case "10sq":
        powerAndRootCal(10, 1, simpleCalString);
        break;
      case "sqrt":
        powerAndRootCal(simpleCalString, "2");
        break;
      case "cbrt":
        powerAndRootCal(simpleCalString, "3");
        break;
      case "1/x":
        stringPreAdder(simpleCalString, "1/");
        break;
      case "2**":
        stringPreAdder(simpleCalString, "2**");
        break;
      case "abs":
        absCal(simpleCalString);
        break;
      case "second-fn-trigger":
        secondBtnTriggerForToggle();
        break;
      default:
        break;
    }
  }
}

Number.prototype.factorial = function () {
  console.log(this);
  return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
};

function isOperationPresent(clickedItem) {
  if (array.includes(clickedItem)) {
    console.log(clickedItem, "from operation present");
    return clickedItem;
  } else {
    return "#";
  }
}

function calculationOfSimpleCal() {
  simpleCalString = stringCalHandler(simpleCalString);
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

function powerAndRootCal(string, factor = 1, power = 1) {
  simpleCalString = Math.pow(string, power / factor);
  setCharAtInputField(simpleCalString);
}

function stringPreAdder(string, addString) {
  string = addString + string;
  simpleCalString = string;
  setCharAtInputField(simpleCalString);
}

function absCal(string) {
  simpleCalString = Math.abs(string);
  setCharAtInputField(simpleCalString);
}

function stringCalHandler(str) {
  try {
    console.log(str, "from string cal handler");
    str = str?.replaceAll("!", '["factorial"]()');
    str = str?.replaceAll("e", "2.7182");
    str = str?.replaceAll("π", "3.14");
    if (str.includes("rt")) {
      customRootCal(str);
      return;
    } else if (str.includes("log")) {
      logCal(str);
      return;
    } else if (str.includes("ln")) {
      logCal(str, "2.7182");
      return;
    }
    console.log(str, "stringCalHandler");
    simpleCalString = eval(str);
  } catch (err) {
    showErrForSomeTime(err);
    return;
  }
  setCharAtInputField(simpleCalString);
}

function logCal(str, base = 10) {
  let result = "";
  if ((base = 10)) {
    result =
      Math.log(str.slice(str.indexOf("g") + 1, str.length)) / Math.log(base);
  } else {
    result =
      Math.log(str.slice(str.indexOf("n") + 1, str.length)) / Math.log(base);
  }
  simpleCalString = result;
  setCharAtInputField(result);
}

function customRootCal(str) {
  let firstNumber = str.slice(0, str.indexOf("rt"));
  let secondNumber = str.slice(str.indexOf("rt") + 2, str.length);
  let result = "";
  try {
    result = eval(`${secondNumber ** (1 / firstNumber)}`);
  } catch (error) {
    showErrForSomeTime(error);
  }
  if (isNaN(result)) showErrForSomeTime("Please enter valid operation");
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
