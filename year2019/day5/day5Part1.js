const extractValueInPositionMode = (parameter, intCode) => { // this will treat parameter as position
  return intCode[parameter];
};

const extractValueOfParameter = (value, mode, intCode) => { // return parameter value acco. to it's mode
  return mode === 0 ? extractValueInPositionMode(value, intCode) : value;
};

const add = (intCode, operands, modes) => {
  const operand1 = extractValueOfParameter(operands[0], modes[0], intCode);
  const operand2 = extractValueOfParameter(operands[1], modes[1], intCode);

  intCode[operands[2]] = operand1 + operand2;

  return 4;
};

const multiply = (intCode, operands, modes) => {
  const operand1 = extractValueOfParameter(operands[0], modes[0], intCode);
  const operand2 = extractValueOfParameter(operands[1], modes[1], intCode);

  intCode[operands[2]] = operand1 * operand2;

  return 4;
};

const input = (intCode, operands) => {
  const input = +prompt();
  intCode[operands[0]] = input;

  return 2;
};

const output = (intCode, operands, modes) => {
  const value = extractValueOfParameter(operands[0], modes[0], intCode);
  console.log(value);

  return 2;
};

const operations = {
  1: add,
  2: multiply,
  3: input,
  4: output,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  99: "halt",
};

const parseInstruction = (instruction) => {
  const modifiedInstruction = instruction.toString();
  const lengthOfInstruction = modifiedInstruction.length;
  const mode = modifiedInstruction.split("").reverse();

  mode.shift();
  mode.shift();

  return {
    instruction: parseInt(modifiedInstruction.slice(lengthOfInstruction - 2)),
    mode: mode.map((num) => parseInt(num)),
  };
};

const evaluateIntCode = (input) => { //10099
  const intCode = input.split(",").map((ele) => parseInt(ele));

  for (let i = 0; i < intCode.length;) {
    const element = intCode[i].toString().padStart(5, 0);
    const { instruction, mode } = parseInstruction(element);
    const operation = operations[instruction];
    const operands = [intCode[i + 1], intCode[i + 2], intCode[i + 3]];

    if (operation === "halt") {
      break;
    }

    i += operation(intCode, operands, mode);
  }
};

evaluateIntCode(
  "3,225,1,225,6,6,1100,1,238,225,104,0,101,71,150,224,101,-123,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,2,205,209,224,1001,224,-3403,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1101,55,24,224,1001,224,-79,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1,153,218,224,1001,224,-109,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1002,201,72,224,1001,224,-2088,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1102,70,29,225,102,5,214,224,101,-250,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1101,12,52,225,1101,60,71,225,1001,123,41,224,1001,224,-111,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1102,78,66,224,1001,224,-5148,224,4,224,1002,223,8,223,1001,224,2,224,1,223,224,223,1101,29,77,225,1102,41,67,225,1102,83,32,225,1101,93,50,225,1102,53,49,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1107,677,677,224,1002,223,2,223,1005,224,329,101,1,223,223,7,677,677,224,1002,223,2,223,1005,224,344,1001,223,1,223,7,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,374,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,404,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,419,101,1,223,223,1007,677,677,224,1002,223,2,223,1005,224,434,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,449,1001,223,1,223,1008,226,677,224,1002,223,2,223,1006,224,464,101,1,223,223,8,677,677,224,1002,223,2,223,1006,224,479,101,1,223,223,108,226,226,224,102,2,223,223,1005,224,494,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,107,226,226,224,1002,223,2,223,1006,224,524,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,539,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,554,101,1,223,223,108,677,677,224,102,2,223,223,1005,224,569,101,1,223,223,107,677,226,224,102,2,223,223,1005,224,584,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,599,101,1,223,223,1108,677,226,224,1002,223,2,223,1006,224,614,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,629,1001,223,1,223,1008,677,677,224,102,2,223,223,1006,224,644,101,1,223,223,1007,226,677,224,102,2,223,223,1005,224,659,101,1,223,223,108,226,677,224,102,2,223,223,1006,224,674,101,1,223,223,4,223,99,226",
);

//1005 0 23