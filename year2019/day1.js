const countFuelRequired = (mass) => Math.floor(mass / 3) - 2;

const countFuelForMass = (mass) => {
  const fuelRequired = countFuelRequired(mass);

  if (fuelRequired <= 0) {
    return 0;
  }

  return fuelRequired + countFuelForMass(fuelRequired);
}

const extractData = () => {
  const input = Deno.readTextFileSync("./year2019/input.txt");
  const masses = input.split("\n");

  return masses;
};

export const addFuelCount = () => {
  const masses = extractData();

  return masses.reduce(
    (totalFuel, mass) => totalFuel + countFuelForMass(parseInt(mass)),0);
};

const totalFuel = addFuelCount();

console.log(totalFuel);

