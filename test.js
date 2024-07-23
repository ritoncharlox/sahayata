const isValidNumber = (str) => {
  const regex = /^(98|97)\d{8}$/;
  return regex.test(str);
};

const number = "983456_891";

console.log(isValidNumber(number));