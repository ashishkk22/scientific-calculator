//basic operation is present or not
function isOperationPresent(clickedItem) {
  return array.includes(clickedItem) ? clickedItem : "#";
}

//fn that is going to just add the operation in the string
function simpleCalculation(value) {
  let string = getValueFromLocal("calString");
  if (string == undefined) string = "";
  string += value;
  setCharAtInputField(string);
}

//going to fire on = click
function calculationOfSimpleCal(stringFromLocalStorage) {
  stringFromLocalStorage = stringCalHandler(stringFromLocalStorage);
}

//main fn to handle the all cal logics
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
    str = eval(str);
    setCharAtInputField(str);
    console.log(str, "after the eval of the fn");
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

//abs cal logic
function absCal(string) {
  string = Math.abs(string);
  if (isNaN(string)) {
    showErrForSomeTime();
    string = "";
  }
  setCharAtInputField(string);
}

//diff. square and root combination fn logic
function powerAndRootCal(string, factor = 1, power = 1) {
  let result = Math.pow(string, power / factor);
  setCharAtInputField(result);
}

//log cal fn with diff. bases logic
function logCal(str, base) {
  let result = "";
  if (str.indexOf("g") != -1) {
    result =
      Math.log(str.slice(str.indexOf("g") + 1, str.length)) / Math.log(base);
  } else {
    result =
      Math.log(str.slice(str.indexOf("n") + 1, str.length)) / Math.log(base);
  }
  setCharAtInputField(result);
}

//custom root fn logic
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
  setCharAtInputField(result);
}

//backspace btn logic to remove last char
function removeCharFromCal(string) {
  string = string?.substring(0, string.length - 1);
  setCharAtInputField(string);
}

//append the string at start
function stringPreAdder(string, addString) {
  string = addString + string;
  setCharAtInputField(string);
}

//error handling function
function showErrForSomeTime(string) {
  document.getElementById("error-div").innerHTML = "Invalid Input!";
  setTimeout(() => {
    document.getElementById("error-div").innerHTML = "";
  }, 5000);
}

//fn to set the string in the input field
function setCharAtInputField(string) {
  if (string == undefined) {
    inputField.value = "";
    return;
  }
  setValueInLocal("calString", string);
  inputField.value = string;
}

//random number gen with below input value
function randomNumberGenerator(string) {
  const randomNumber = Math.floor(Math.random() * string);
  setCharAtInputField(randomNumber);
}

//cal floorN from input
function floorNumberCal(string) {
  const newRoundOfNumber = Math.floor(string);
  setCharAtInputField(newRoundOfNumber);
}

//cal celiN from input
function celiNumberCal(string) {
  const newCeliNumber = Math.ceil(string);
  setCharAtInputField(newCeliNumber);
}

//== change in UI functions ==

//fn that changes color
function changeButtonColor(e) {
  e.target.classList.contains("btn-blue")
    ? e.target.classList.remove("btn-blue")
    : e.target.classList.add("btn-blue");
}

//fn that show second btn that are hidden on click event
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

//unit changing in the cal with clicks logic
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

//based on the string changing html value
function changeTheUnitInHtml(string) {
  const unitOfAngleBtn = document.getElementById("unit-of-angle");
  unitOfAngleBtn.innerHTML = string;
}
