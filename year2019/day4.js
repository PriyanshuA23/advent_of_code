const isPasswordUnderCriteria = (password) => {
  const splitedPassword = password.toString().split('').map((num) => parseInt(num));

  let isAdjacentDigits = false;
  let previousDigit = -Infinity;

  for (const digit of splitedPassword) {
    if (digit < previousDigit && previousDigit > digit) return false;
    if (digit === previousDigit) isAdjacentDigits = true;
    previousDigit = digit;
  }

  return isAdjacentDigits;
}

const calculateTotalPossiblePasswords = () => {
  const startRange =  153517;
  const endRange =  630395;
  let totalCount = 0;

  for (let password = startRange; password <= endRange; password++) {
    if (isPasswordUnderCriteria(password)){
      totalCount++;
    }
  }
  console.log(totalCount);
  
  return totalCount;
}

calculateTotalPossiblePasswords()