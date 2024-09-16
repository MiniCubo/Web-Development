/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};
function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  console.log(n)
  var val = f(n);
  return val;
}
function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    value = fibSequence(n);
    memo[n] = value;
  }

  return value;
}
function fibSequence(n){
  var fn1 = 0, fn2 = 1, nextFibonacci;
  for (var i = 1; i <= n; i++) {
    nextFibonacci = fn1 + fn2;
    fn1 = fn2;
    fn2 = nextFibonacci;
 }
 return fn1
}
function putF(){
  var number = fibonacci()
  var label = document.querySelector("#fibonacciLbl")
  label.textContent = number
}
var btn = document.querySelector("button")
btn.addEventListener("click", putF)
