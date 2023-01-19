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

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "/", "*"];
const mainElementForEvents = document.querySelector("#calculator-div");

//only one main event listener for all the btn.
mainElementForEvents.addEventListener("click", btnClickHandler);

function btnClickHandler(e) {
  if (e.target != e.currentTarget) {
    var clickedItem = e.target.id;
    console.log(clickedItem);
  }
}
