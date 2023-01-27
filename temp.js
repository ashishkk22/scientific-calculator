// str.replace("ak","22") //first match
// str.replaceAll("ak","22") //replace all the match

// const obj = {
//   1: "ak",
//   22: "function",
//   3: "ss",
//   4: "boy",
// };
// console.log(obj);

const myDate = new Date();
let object = myDate;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);

console.log(Number.prototype);
