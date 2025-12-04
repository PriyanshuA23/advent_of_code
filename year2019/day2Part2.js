import { extractData } from "./day2.js";

const extractVerbAndNoun = () => {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      if(extractData(noun, verb) === 19690720) {
        return [noun, verb]
      }
    }
  }
}
const verbAndNoun = extractVerbAndNoun();
console.log(100 * verbAndNoun[0] + verbAndNoun[1]);
