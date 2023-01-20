// const cal = "10!";

// const result = eval(cal);
// console.log(result);

// Number.prototype.factorial = function () {
//   return this > 0 ? this * (this - 1).factorial() : 1; //factorial logic
// };

// function evaluate(str) {
//   str = str.replaceAll("!", '["factorial"]()');
//   //   console.log(str); // Just to see what it generates
//   return eval(str);
// }

// console.log(evaluate("1 + (2*3)!")); // 721
// console.log(evaluate("3!!-1")); // 619
// console.log(evaluate("(2-2)!*3")); // 3
// console.log(evaluate("'abc'.length!")); // 6

// const cal = "log10";
// // const result = eval(cal);
// // const result2 = Math.pow(27, 1 / 3);
// const result3 = eval("27**(1/3)");
// console.log(result3);

// const btn = document.getElementsByClassName("btn");
// btn.addEventListeners("click",()=>{

// })

const result = eval("(2+2)*2");
console.log(result);
