//! fundamentals of js

// <------------------------------------------------------------------------------------->
//! arrays
//* filter map foreach find indexOf includes
let sudoarr = [1, 2, 3, 4, 5],
  fn = () => {},
  obj = { a: 1, b: 2 };

//? we can store multiple values of different types in an array

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// do something with each element of the array
//? arr.forEach((item, index , array)=>{console.log(item, index, array)})

// <------------------------------------------------------------------------------------->

//! map
//? creates a new array with the results of calling a provided function on every element in the calling array

const alt_arr = arr.map((item, index, array) => {
  return item * 2;
});
// ? console.log(alt_arr);

// <------------------------------------------------------------------------------------->

//! objects

//? key value pair

var obj1 = {
  name: "John",

  age: 30,
  isAdmin: true,
  courses: ["html", "css", "js"],
  wife: null,
};
Object.freeze(obj1); // freeze the object
obj1.age = 33; // update
delete obj1.wife; // delete
// console.log(obj1.courses[0])

// <------------------------------------------------------------------------------------->

//! functions
//? function is a block of code designed to perform a particular task
//? function is executed when "something" invokes it (calls it)

function add(a, b) {
  return a + b;
}
//? funfact we can find the length of the function by using the length property that gives the number of parameters
console.log(add.length); // 2

// <------------------------------------------------------------------------------------->
//! asynccrounous js
//?  is a programming paradigm that allows for non-blocking operations, enabling tasks to run concurrently without waiting for each other to complete. This is particularly useful in scenarios where tasks involve waiting for external resources, such as network requests or file I/O, allowing the main program to remain responsive and efficient.

async function fetchData() {
  let blob = await fetch("https://randomuser.me/api/");
  let data = await blob.json();
  console.log(data.results[0].gender);
}

fetchData();
