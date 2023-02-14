import {
  inputField,
  isOperationPresent,
  simpleCalculation,
  calculationOfSimpleCal,
  absCal,
  powerAndRootCal,
  removeCharFromCal,
  stringPreAdder,
  isTrigonoCal,
  setCharAtInputField,
  randomNumberGenerator,
  floorNumberCal,
  celiNumberCal,
  toExponentialConvert,
  changeTheValue,
  degToDms,
  inputToDeg,
  addTheValueToMemory,
  removeTheValueFromMemory,
  recallTheValueFromMemory,
  buttonVisibilityHandler,
  changeButtonColor,
  secondBtnShow,
  changeInUnitOfAngle,
  dynamicStyleDrawer,
  dynamicStyleDrawerWithDebounce,
  drawerShow,
  drawerClose,
  showStoredNumbers,
  removeNumbers,
  setValueInLocal,
  getValueFromLocal,
} from "./functions.js";

//two flags to toggle the btn
let flagForToggleBtn = false;
let flagForHypBtn = false;

//to store the nums
let storedNumbers = [];

let box = document.getElementById("calculator-div");
let rect = box.getBoundingClientRect();
let drawerContent = document.querySelector(".calDiv_drawer");

//to adjust the drawer position, if resize window
addEventListener("resize", () => {
  rect = box.getBoundingClientRect();
  dynamicStyleDrawerWithDebounce(drawerContent, rect);
});

let mRecallBtn = document.getElementById("m-recall");
let mClearBtn = document.getElementById("m-clear");
//enable or disable the btn
buttonVisibilityHandler(mRecallBtn, mClearBtn);

//factorial method on Number
Number.prototype.factorial = function () {
  return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
};

//set initial value in the input field empty or existing
getValueFromLocal("calString") === undefined
  ? inputField.value
  : (inputField.value = getValueFromLocal("calString"));

const mainElementForEvents = document.querySelector("#calculator-div");

//only one main event listener for all the btn (event delegation)
mainElementForEvents.addEventListener("click", btnClickHandler);

function btnClickHandler(e) {
  //currentTarget --> element that the listener was bound to.
  //target --> on we do actually click
  if (e.target === e.currentTarget) return;

  //if not clicked On currentTarget
  let stringFromLocalStorage = getValueFromLocal("calString");
  let storedNumberOutput = getValueFromLocal("storedNum");
  storedNumberOutput === undefined ? setValueInLocal("storedNum", 0) : 0;
  var clickedItem = e.target.id;
  switch (clickedItem) {
    case isOperationPresent(clickedItem):
      if (clickedItem === "log1" || clickedItem === "log2") {
        clickedItem = "log";
      }
      simpleCalculation(clickedItem);
      break;
    case "m-plus":
      addTheValueToMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-minus":
      removeTheValueFromMemory();
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-clear":
      setValueInLocal("storedNum", 0);
      setValueInLocal("storedNums", "");
      storedNumbers = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-recall":
      recallTheValueFromMemory(drawerContent, rect);
      break;
    case "m-store":
      storedNumbers.push(getValueFromLocal("calString"));
      setValueInLocal("storedNums", storedNumbers);
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "m-show":
      dynamicStyleDrawer(drawerContent, rect);
      drawerShow(drawerContent);
      showStoredNumbers(drawerContent);
      break;
    case "drawer-close":
      drawerClose(drawerContent);
      break;
    case "remove-nums":
      removeNumbers();
      storedNumbers = [];
      buttonVisibilityHandler(mRecallBtn, mClearBtn);
      break;
    case "=":
      calculationOfSimpleCal(stringFromLocalStorage);
      break;
    case "remove-char":
      removeCharFromCal(stringFromLocalStorage);
      break;
    case "reset-char":
      stringFromLocalStorage = "";
      setCharAtInputField(stringFromLocalStorage);
      break;
    case "10sq":
      powerAndRootCal(10, 1, stringFromLocalStorage);
      break;
    case "sqrt":
      powerAndRootCal(stringFromLocalStorage, "2");
      break;
    case "cbrt":
      powerAndRootCal(stringFromLocalStorage, "3");
      break;
    case "1/x":
      stringPreAdder(stringFromLocalStorage, "1/");
      break;
    case "2**":
      stringPreAdder(stringFromLocalStorage, "2**");
      break;
    case "abs1":
    case "abs2":
      absCal(stringFromLocalStorage);
      break;
    case "random-num":
      randomNumberGenerator(stringFromLocalStorage);
      break;
    case "floor":
      floorNumberCal(stringFromLocalStorage);
      break;
    case "celi":
      celiNumberCal(stringFromLocalStorage);
      break;
    case "unit-of-angle":
      changeInUnitOfAngle();
      break;
    case "e-sq-x":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "e**":
      stringPreAdder(stringFromLocalStorage, "e**");
      break;
    case "to-expo":
      toExponentialConvert();
      break;
    case "plus-minus":
      changeTheValue();
      break;
    case "dms":
      degToDms();
      break;
    case "deg":
      inputToDeg();
      break;
    case "second-fn-Trigono":
      if (flagForHypBtn) {
        break;
      }
      const btnsOfTrigono = document.getElementsByClassName("trigono-btn");
      changeButtonColor(e);
      secondBtnShow(btnsOfTrigono);
      flagForToggleBtn === false
        ? (flagForToggleBtn = true)
        : (flagForToggleBtn = false);
      break;
    case "second-fn-Trigono-h":
      if (flagForToggleBtn) {
        const btnOfHTrigonoInverse =
          document.getElementsByClassName("trigono-h-inv");
        changeButtonColor(e);
        secondBtnShow(btnOfHTrigonoInverse);
      } else {
        const btnOfHTrigono = document.getElementsByClassName("trigono-h-btn");
        changeButtonColor(e);
        secondBtnShow(btnOfHTrigono);
      }
      flagForHypBtn === false
        ? (flagForHypBtn = true)
        : (flagForHypBtn = false);
      break;
    case "second-fn":
      const allBtnForToggle = document.getElementsByClassName("2nd-toggle-btn");
      changeButtonColor(e);
      secondBtnShow(allBtnForToggle);
      break;
    default:
      isTrigonoCal(clickedItem);
      break;
  }
}
