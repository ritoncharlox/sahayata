const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const email = "dslkf@lkfadasf.ssdaf"
const test = isValidEmail(email);

console.log(test);