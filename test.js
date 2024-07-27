const obj = {
  name1: "Hello",
  name2: "Hi",
}

const name = "Hello";

const obj2 = {
  ...obj,
  [name]: "name2"
}

console.log(obj2);