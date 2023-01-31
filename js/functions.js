//basic operation is present or not
function isOperationPresent(clickedItem) {
  return array.includes(clickedItem) ? clickedItem : "#";
}

//fn that is going to just add the operation in the string
function simpleCalculation(value) {
  let string = getValueFromLocal("calString");
  if (string === undefined) string = "";
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
      logCal(str, "2.7182");
      return;
    }
    str = eval(str);
    setCharAtInputField(str);
  } catch (err) {
    showErrForSomeTime("Invalid Input!");
  }
}

//abs cal logic
function absCal(string) {
  string = Math.abs(string);
  if (isNaN(string)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(string);
}

//diff. square and root combination fn logic
function powerAndRootCal(string, factor = 1, power = 1) {
  let result = Math.pow(string, power / factor);
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(result);
}

//log cal fn with diff. bases logic
function logCal(str, base) {
  let result = "";
  if (str.indexOf("g") !== -1 && !str.includes("(")) {
    result =
      Math.log(str.slice(str.indexOf("g") + 1, str.length)) / Math.log(base);
  } else if (str.includes("(") && str.includes(")")) {
    const customBase = str.slice(str.indexOf("(") + 1, str.indexOf(")"));
    const value = str.slice(str.indexOf("g") + 1, str.indexOf("("));
    result = Math.log(value) / Math.log(customBase);
  } else {
    result =
      Math.log(str.slice(str.indexOf("n") + 1, str.length)) / Math.log(base);
  }
  if (isNaN(result)) {
    showErrForSomeTime();
    return;
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
  string == undefined ? (string = "") : (string = string);
  string = addString + string;
  setCharAtInputField(string);
}

//all trigonometry operation's array
let trignoOperations = [
  "sin",
  "sin-h",
  "sin-in",
  "sin-h-in",
  "cos",
  "cos-h",
  "cos-in",
  "cos-h-in",
  "tan",
  "tan-h",
  "tan-in",
  "tan-h-in",
  "sec",
  "sec-h",
  "sec-in",
  "sec-h-in",
  "csc",
  "csc-h",
  "csc-in",
  "csc-h-in",
  "cot",
  "cot-h",
  "cot-in",
  "cot-h-in",
];

//operation is trigno or not
function isTrignoCal(clickedItem) {
  trignoOperations.includes(clickedItem)
    ? trignoOperationHandler(clickedItem)
    : "";
}

//to handle all the trigonometry operations
function trignoOperationHandler(clickedItem) {
  let value = getValueFromLocal("calString");
  if (unitOfAngle.degree === true) {
    //converting degree to radian
    value = (value * Math.PI) / 180;
  } else if (unitOfAngle.grad === true) {
    //1 Gradians to Radians = 0.0157
    value = value * 0.0157;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  if (clickedItem.includes("sin")) {
    sinTrignoOperations(clickedItem, value);
  } else if (clickedItem.includes("cos")) {
    cosTrignoOperations(clickedItem, value);
  } else if (clickedItem.includes("tan")) {
    tanTrignoOperations(clickedItem, value);
  } else if (clickedItem.includes("csc")) {
    cscTrignoOperations(clickedItem, value);
  } else if (clickedItem.includes("sec")) {
    secTrignoOperations(clickedItem, value);
  } else if (clickedItem.includes("cot")) {
    cotTrignoOperations(clickedItem, value);
  }
}

// let combinedFn = {
//   "sin":Math.sin(),
//   "cos":Math.cos(),
// }

//to handle all the sin operations
function sinTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "sin":
      value = Math.sin(value);
      break;
    case "sin-in":
      if (value <= 1 && value >= -1) {
        value = Math.asin(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
    case "sin-h":
      value = Math.sinh(value);
      break;
    case "sin-h-in":
      value = Math.asinh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cos operations
function cosTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "cos":
      value = Math.cos(value);
      break;
    case "cos-in":
      if (value <= 1 && value >= -1) {
        value = Math.acos(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
    case "cos-h":
      value = Math.cosh(value);
      break;
    case "cos-h-in":
      value = Math.acosh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the tan operations
function tanTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "tan":
      value = Math.tan(value);
      break;
    case "tan-in":
      value = Math.atan(value);
      break;
    case "tan-h":
      value = Math.tanh(value);
      break;
    case "tan-h-in":
      if (value <= 1 && value >= -1) {
        value = Math.atanh(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cosec operation
function cscTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "csc":
      value = 1 / Math.sin(value);
      break;
    case "csc-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.asin(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
    case "csc-h":
      value = 1 / Math.sinh(value);
      break;
    case "csc-h-in":
      value = 1 / Math.asinh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the sec operations
function secTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "sec":
      value = 1 / Math.cos(value);
      break;
    case "sec-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.acos(value);
        setCharAtInputField(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
    case "sec-h":
      value = 1 / Math.cosh(value);
      break;
    case "sec-h-in":
      value = 1 / Math.acosh(value);
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//to handle all the cot operations
function cotTrignoOperations(clickedItem, value) {
  switch (clickedItem) {
    case "cot":
      value = 1 / Math.tan(value);
      break;
    case "cot-in":
      value = 1 / Math.atan(value);
      break;
    case "cot-h":
      value = 1 / Math.tanh(value);
      break;
    case "cot-h-in":
      if (value <= 1 && value >= -1) {
        value = 1 / Math.atanh(value);
      } else {
        showErrForSomeTime("Please enter the input from -1 to 1 (RAD)");
        return;
      }
      break;
  }
  if (isNaN(value)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(value);
}

//error handling function
function showErrForSomeTime(string) {
  string !== undefined ? string : (string = "Invalid Input!");
  document.getElementById("error-div").innerHTML = string;
  setTimeout(() => {
    document.getElementById("error-div").innerHTML = "";
  }, 5000);
}

//fn to set the string in the input field
function setCharAtInputField(string) {
  if (string === undefined) {
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
  if (isNaN(newRoundOfNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(newRoundOfNumber);
}

//cal celiN from input
function celiNumberCal(string) {
  const newCeliNumber = Math.ceil(string);
  if (isNaN(newCeliNumber)) {
    showErrForSomeTime();
    return;
  }
  setCharAtInputField(newCeliNumber);
}

function toExponentialConvert() {
  let string = getValueFromLocal("calString");
  let expoNum = Number.parseFloat(string).toExponential();
  if (isNaN(expoNum)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  // expoNum = expoNum?.replaceAll("e", "*e");
  setCharAtInputField(expoNum);
}

//change the value plus to minus or minus to plus
function changeTheValue() {
  let value = getValueFromLocal("calString");
  if (value.charAt(0) == "-") {
    value = value.substring(1, value.length);
  } else {
    value = "-" + value;
  }
  setCharAtInputField(value);
}

//degree to dms
function degToDms() {
  let deg = getValueFromLocal("calString");
  if (unitOfAngle.degree === false || isNaN(Number(deg))) {
    showErrForSomeTime("Please enter the input in DEG with numbers!");
    return;
  }
  let d = Math.floor(deg);
  let minfloat = (deg - d) * 60;
  let m = Math.floor(minfloat);
  let secfloat = (minfloat - m) * 60;
  let s = Math.round(secfloat);
  // After rounding, the seconds might become 60.
  if (s == 60) {
    m++;
    s = 0;
  }
  if (m == 60) {
    d++;
    m = 0;
  }
  let output = "" + d + ":" + m + ":" + s;
  setCharAtInputField(output);
}

//radian, grade to deg
function inputToDeg() {
  let value = getValueFromLocal("calString");
  if (unitOfAngle.degree === true) {
    return;
  } else if (unitOfAngle.radian === true) {
    value = value * (180 / Math.PI);
  } else if (unitOfAngle.grad === true) {
    value = value / 0.0157;
  }
  if (isNaN(value)) {
    showErrForSomeTime("Please enter Numbers!");
    return;
  }
  setCharAtInputField(value);
}

//=== stored memory cal fn ===
function addTheValueToMemory() {
  let string = getValueFromLocal("calString");
  if (string === undefined) string = "";
  let storedNum = getValueFromLocal("storedNum");
  if (storedNum == undefined) string = "";
  const value = Number(string) + Number(storedNum);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", value);
}

//minus the value from the stored
function removeTheValueFromMemory() {
  let string = getValueFromLocal("calString");
  if (string === undefined) string = "";
  let storedNum = getValueFromLocal("storedNum");
  if (storedNum == undefined) string = "";
  const value = Number(storedNum) - Number(string);
  if (isNaN(value)) {
    showErrForSomeTime("Invalid Input!");
    return;
  }
  setValueInLocal("storedNum", value);
}

//show the output of cal (stored num)
function recallTheValueFromMemory() {
  let string = getValueFromLocal("storedNum");
  setCharAtInputField(string);
}

//visibility of btn based on the memory
function buttonVisibilityHandler(mRecallBtn, mClearBtn) {
  if (
    getValueFromLocal("storedNum") == 0 &&
    getValueFromLocal("storedNums") == undefined
  ) {
    mRecallBtn.disabled = true;
    mClearBtn.disabled = true;
  } else {
    mRecallBtn.disabled = false;
    mClearBtn.disabled = false;
  }
}

//== change in btn UI functions ==

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
  if (unitOfAngle.degree === true) {
    unitOfAngle.radian = true;
    unitOfAngle.degree = false;
    changeTheUnitInHtml("RAD");
  } else if (unitOfAngle.radian === true) {
    unitOfAngle.grad = true;
    unitOfAngle.radian = false;
    changeTheUnitInHtml("GRAD");
  } else if (unitOfAngle.grad === true) {
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

// === drawer and related to that fns ===
function dynamicStyleDrawer(drawerContent, rect) {
  console.log("called");
  drawerContent.style.bottom = `calc(100% - ${rect.bottom}px)`;
  drawerContent.style.height = `${rect.height * 0.65}px`;
  drawerContent.style.width = `${rect.width}px`;
}
//debounce polyfill

function myDebounce(cb, d) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, d);
  };
}
const dynamicStyleDrawerWithDebounce = myDebounce((drawerContent, rect) => {
  dynamicStyleDrawer(drawerContent, rect);
}, 3000);

// let timer;
// function dynamicStyleDrawerWithDebounce(fn, d, ...args) {
//   clearTimeout(timer);
//   timer = setTimeout(() => {
//     fn(...args);
//   }, d);
// }

function drawerShow(drawerContent) {
  drawerContent.style.display = "inline";
}

function drawerClose(drawerContent) {
  drawerContent.style.display = "none";
}

//show the stored nums with child append
function showStoredNumbers() {
  const array = getValueFromLocal("storedNums")?.split(",");
  if (array === undefined) {
    document.getElementById("empty-msg").innerText =
      "There's is nothing saved in your memory";
    return;
  } else {
    document.getElementById("empty-msg").innerText = "";
  }
  let storedDiv = document.querySelector(".stored-nums-container");
  while (storedDiv?.firstChild) {
    storedDiv.firstChild?.remove();
  }
  let child = array?.map(number => {
    return `<p class="me-3 h5" > ${number} </p>`;
  });
  if (child !== undefined) {
    for (const i of child) {
      storedDiv.insertAdjacentHTML("beforeend", i);
    }
  }
}

//remove number from the ui and memory
function removeNumbers() {
  let storedDiv = document.querySelector(".stored-nums-container");
  while (storedDiv?.firstChild) {
    storedDiv.firstChild?.remove();
  }
  document.getElementById("empty-msg").innerText =
    "There's is nothing saved in your memory";
  storedNumbers = [];
  setValueInLocal("storedNums", "");
}
