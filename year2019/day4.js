const isPasswordUnderCriteria = (password) => {
  const splitedPassword = password.toString().split('').map((num) => parseInt(num));

  const totalAdjacentDigits = [];
  let adjacentDigit = 1;
  let previousDigit = -Infinity;

  for (const digit of splitedPassword) {
    if (digit < previousDigit && previousDigit > digit) return false;
    if (digit !== previousDigit) {
      totalAdjacentDigits.push(adjacentDigit); 
      adjacentDigit = 1;
    }

    if (digit === previousDigit) adjacentDigit++;
    previousDigit = digit;
  }
  totalAdjacentDigits.push(adjacentDigit);
  
  return totalAdjacentDigits.join('').toString().includes('2') ;
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