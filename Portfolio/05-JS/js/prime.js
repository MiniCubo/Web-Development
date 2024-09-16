/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

function primeFactors(n) {
  "use strict";
  var sequence = [];
  var i;
    for (i = 2; i <= Math.sqrt(n); i++) {
      if(n % i === 0){
        var bandera = true
        sequence.forEach((element) =>{
          if (i%element === 0){
            bandera = false
          }
        })
        if (bandera){
          sequence.push(i)
        }
      }
      if(i > 2){
        i++
      }
      }
  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  if(sequence.length == 0){
    return [n]
  }
  else{
    return sequence;
  }
};

function getPrimeFactors(){
  var input = document.querySelector("#num")
  var num = input.value
  var label = document.querySelector("#pf").textContent = primeFactors(num)
}
