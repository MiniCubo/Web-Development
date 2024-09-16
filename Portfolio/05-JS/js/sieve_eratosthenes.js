/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

function sieve(n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.
  for(var a = 0; a < n; a++){
    array.push(true)
  }
  for(i=2; i<= n;i++){
    if(array[i]){
      primes.push(i)
      for(j=2*i; j<n; j += i){
        array[j] = false
      }
    }
  }
  return primes;
}

function getSieve(){
  var input = document.querySelector("#num")
  var number = input.value
  var arr = sieve(number)
  console.log(arr)
  document.querySelector("#primes").textContent = arr
}
var button = document.querySelector("#btn")
button.addEventListener("click", () => getSieve())
