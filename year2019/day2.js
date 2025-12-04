const operations = {
  1: "add",
  2: "multiply",
  99: "hault",
};

const performAddOrMultiply = (intCode, currentIndex, operation) => {
  const input1Position = intCode[currentIndex + 1];
  const input2Position = intCode[currentIndex + 2];
  const input1Value = parseInt(intCode[input1Position]);
  const input2Value = parseInt(intCode[input2Position]);

  return operation === "add"
    ? input1Value + input2Value
    : input1Value * input2Value;
};

const evaluateIntCode = (input) => {//10099
  const intCode = input;

  for (let index = 0; index < intCode.length; index += 4) {
    const operation = operations[intCode[index]];
    const positionOfResult = intCode[index + 3];

    if (operation !== "hault") {
      const result = performAddOrMultiply(intCode, index, operation);

      intCode[positionOfResult] = result;
    } else {
      return intCode[0];
    }
  }

  return intCode[0];
};

export const extractData = (noun, verb) => {
  const data = Deno.readTextFileSync("./year2019/day2Input1.txt");
  const intCode = data.split(',');

  intCode[1] = noun + "";
  intCode[2] = verb + "";

  return evaluateIntCode(intCode);
}

