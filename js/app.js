//two flags to toggle the btn
let flagForToggleBtn = false;
let flagForHypBtn = false;

//object to track the unit that changes on click
let unitOfAngle = {
  degree: true,
  radian: false,
  grad: false,
};

//set and get the data from the local storage
function setValueInLocal(key, value) {
  localStorage.setItem(key, value);
}

//get the values from the local storage
function getValueFromLocal(key) {
  if (!localStorage.getItem(key)) {
    setValueInLocal(key, "");
  } else {
    return localStorage.getItem(key);
  }
}

//factorial method on Number
Number.prototype.factorial = function () {
  return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
};

//array to check the operations.
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
  "e**",
];

const inputField = document.querySelector("textarea");

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

  if (e.target != e.currentTarget) {
    let stringFromLocalStorage = getValueFromLocal("calString");
    var clickedItem = e.target.id;
    switch (clickedItem) {
      case isOperationPresent(clickedItem):
        simpleCalculation(clickedItem);
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
      case "abs":
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
      case "second-fn-trigno":
        if (flagForHypBtn) {
          break;
        }
        const btnsOfTrigno = document.getElementsByClassName("trigno-btn");
        changeButtonColor(e);
        secondBtnShow(btnsOfTrigno);
        flagForToggleBtn === false
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
        flagForHypBtn === false
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
        isTrignoCal(clickedItem);
        break;
    }
  }
}
