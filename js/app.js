let simpleCalString = "";
let flagForToggleBtn = false;
let flagForHypBtn = false;
let unitOfAngle = {
  degree: true,
  radian: false,
  grad: false,
};

function setValueInLocal(key, value) {
  localStorage.setItem(key, value);
}

function getValueFromLocal(key) {
  return localStorage.getItem(key);
}
//factorial method on Number
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

//only one main event listener for all the btn (event delegation)
mainElementForEvents.addEventListener("click", btnClickHandler);

function btnClickHandler(e) {
  //currentTarget --> element that the listener was bound to.
  //target --> on we do actually click

  if (e.target != e.currentTarget) {
    console.log(simpleCalString, "main string after every click");
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
      case "random-num":
        randomNumberGenerator();
        break;
      case "floor":
        floorNumberCal();
        break;
      case "celi":
        celiNumberCal();
        break;
      case "unit-of-angle":
        changeInUnitOfAngle();
        break;
      case "e-sq-x":
        stringPreAdder(simpleCalString, "e**");
        break;
      case "second-fn-trigno":
        if (flagForHypBtn) {
          break;
        }
        const btnsOfTrigno = document.getElementsByClassName("trigno-btn");
        changeButtonColor(e);
        secondBtnShow(btnsOfTrigno);
        flagForToggleBtn == false
          ? (flagForToggleBtn = true)
          : (flagForToggleBtn = false);
        break;
      case "second-fn-trigno-h":
        if (flagForToggleBtn) {
          const btnOfHTrignoInverse =
            document.getElementsByClassName("trigno-h-inv");
          changeButtonColor(e);
          secondBtnShow(btnOfHTrignoInverse);
        } else {
          const btnOfHTrigno = document.getElementsByClassName("trigno-h-btn");
          changeButtonColor(e);
          secondBtnShow(btnOfHTrigno);
        }
        flagForHypBtn == false
          ? (flagForHypBtn = true)
          : (flagForHypBtn = false);
        break;
      case "second-fn":
        const allBtnForToggle =
          document.getElementsByClassName("2nd-toggle-btn");
        changeButtonColor(e);
        secondBtnShow(allBtnForToggle);
        break;
      default:
        break;
    }
  }
}

function isOperationPresent(clickedItem) {
  return array.includes(clickedItem) ? clickedItem : "#";
}

function calculationOfSimpleCal() {
  simpleCalString = stringCalHandler(simpleCalString);
}

function simpleCalculation(string) {
  if (simpleCalString == undefined) simpleCalString = "";
  simpleCalString += string;
  setCharAtInputField(simpleCalString);
}

function changeButtonColor(e) {
  e.target.classList.contains("btn-blue")
    ? e.target.classList.remove("btn-blue")
    : e.target.classList.add("btn-blue");
}

function secondBtnShow(
  allBtnForToggle,
  classOne = "d-inline",
  classTwo = "d-none"
) {
  Array.from(allBtnForToggle).map(visibleBtn => {
    //visibleBtn ==> element from DOMTokenList
    if (visibleBtn.classList.contains(classOne)) {
      visibleBtn.classList.toggle(classTwo);
    } else {
      visibleBtn.classList.toggle(classTwo);
    }
  });
}

function showErrForSomeTime(string) {
  document.getElementById("error-div").innerHTML = "Invalid Input!";
  setTimeout(() => {
    document.getElementById("error-div").innerHTML = "";
  }, 5000);
}

function removeCharFromCal(string) {
  string = string?.substring(0, string.length - 1);
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
  console.log(string, "=====string from abs=========");
  simpleCalString = Math.abs(simpleCalString);
  setCharAtInputField(simpleCalString);
}

function stringCalHandler(str) {
  try {
    console.log(str, "from string cal handler");
    str = str?.replaceAll("!", '["factorial"]()');
    str = str?.replaceAll("e", "2.7182");
    str = str?.replaceAll("π", "3.14");
    if (str?.includes("rt")) {
      customRootCal(str);
      return;
    } else if (str.includes("log")) {
      logCal(str, "10");
      return;
    } else if (str.includes("ln")) {
      console.log(str, "for the ln calculation");
      logCal(str, "2.7182");
      return;
    }
    simpleCalString = eval(str);
    setCharAtInputField(simpleCalString);
    console.log(simpleCalString, "after the eval of the fn");
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

function logCal(str, base) {
  console.log(str);
  let result = "";
  if (str.indexOf("g") != -1) {
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
  if (isNaN(result)) showErrForSomeTime("Invalid Input!");
  simpleCalString = result;
  setCharAtInputField(simpleCalString);
}

function randomNumberGenerator() {
  const randomNumber = Math.floor(Math.random() * simpleCalString);
  simpleCalString = randomNumber;
  setCharAtInputField(simpleCalString);
}

function floorNumberCal() {
  const newRoundOfNumber = Math.floor(simpleCalString);
  simpleCalString = newRoundOfNumber;
  setCharAtInputField(newRoundOfNumber);
}

function celiNumberCal() {
  const newCeliNumber = Math.ceil(simpleCalString);
  simpleCalString = newCeliNumber;
  setCharAtInputField(newCeliNumber);
}

function changeInUnitOfAngle() {
  if (unitOfAngle.degree == true) {
    unitOfAngle.radian = true;
    unitOfAngle.degree = false;
    changeTheUnitInHtml("RAD");
  } else if (unitOfAngle.radian == true) {
    unitOfAngle.grad = true;
    unitOfAngle.radian = false;
    changeTheUnitInHtml("GRAD");
  } else if (unitOfAngle.grad == true) {
    unitOfAngle.degree = true;
    unitOfAngle.grad = false;
    changeTheUnitInHtml("DEG");
  }
}

function changeTheUnitInHtml(string) {
  const unitOfAngleBtn = document.getElementById("unit-of-angle");
  unitOfAngleBtn.innerHTML = string;
}

//fn to set the string in the input field
function setCharAtInputField(string) {
  // if (string == undefined) {
  //   inputField.value = "";
  //   return;
  // }
  inputField.value = string;
}
