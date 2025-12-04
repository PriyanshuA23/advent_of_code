const direction = {
  R: (x, y, steps) => [x + steps, y],
  L: (x, y, steps) => [x - steps, y],
  U: (x, y, steps) => [x, y + steps],
  D: (x, y, steps) => [x, y - steps],
};

const parseMovement = (movement) => {
  return [movement[0], parseInt(movement.slice(1))];
};

const move = (x, y, [heading, movement]) => {
  const moveWire = direction[heading];
  return moveWire(x, y, movement);
};

const extractWire1Coordinates = (input) => {
  const wire = [];
  let x = 0;
  let y = 0;

  wire.push([x, y]);
  input.forEach((element) => {
    const moveDetails = parseMovement(element);
    [x, y] = move(x, y, moveDetails);
    wire.push([x, y]);
  });

  return wire;
};

const isBetweenRange = (range, number) => {
  const startingRange = range[0] < range[1] ? range[0] : range[1];
  const endRange = range[0] > range[1] ? range[0] : range[1];

  return startingRange <= number && number <= endRange;
};

const checkLineIntersects = (wire1Points, wire2Points) => {
  const [[x0, y0], [x1, y1]] = wire1Points;
  const [[a0, b0], [a1, b1]] = wire2Points;
  const pointOfIntersect = [0, 0];
  let flag = false;

  if (x0 === x1 && a0 !== a1) {
    flag = isBetweenRange([a0, a1], x0);

    if (!flag) {
      return { status: flag, pointOfIntersect };
    }
    pointOfIntersect[0] = x0;
  }

  if (x0 !== x1 && a0 === a1) {
    flag = isBetweenRange([x0, x1], a0);
    if (!flag) {
      return { status: flag, pointOfIntersect };
    }
    pointOfIntersect[0] = a0;
  }

  if (flag === false) {
    return { status: false, pointOfIntersect };
  }

  if (y0 === y1 && b0 !== b1) {
    flag = isBetweenRange([b0, b1], y0);
    if (!flag) {
      return { status: flag, pointOfIntersect };
    }
    pointOfIntersect[1] = y0;
  }

  if (y0 !== y1 && b0 === b1) {
    flag = isBetweenRange([y0, y1], b0);
    if (!flag) {
      return { status: flag, pointOfIntersect };
    }
    pointOfIntersect[1] = b0;
  }

  if (flag === false) {
    return { status: false, pointOfIntersect };
  }

  return { status: true, pointOfIntersect };
};

const extractIntersectionPoints = (wire1, wire2) => {
  const intersectionPoints = [];

  for (let wire1Index = 1; wire1Index < wire1.length; wire1Index++) {
    for (let wire2Index = 1; wire2Index < wire2.length; wire2Index++) {
      const wire1Points = [wire1[wire1Index - 1], wire1[wire1Index]];
      const wire2Points = [wire2[wire2Index - 1], wire2[wire2Index]];
      const { status, pointOfIntersect } = checkLineIntersects(
        wire1Points,
        wire2Points,
      );

      if (status) {
        intersectionPoints.push(pointOfIntersect);
      }
    }
  }

  return intersectionPoints;
};

const extractClosestDistance = (points) => {
  const distances = [];

  for (const point of points) {
    const sumOfPoint = Math.abs(point[0]) + Math.abs(point[1]);
    distances.push(sumOfPoint);
  }

  distances.sort((a, b) => a - b);
  
  return distances[0];
}

const calculateClosestIntersection = (input1, input2) => {
  const wire1 = input1.split(",");
  const wire2 = input2.split(",");

  const wire1Coordinate = extractWire1Coordinates(wire1);
  const wire2Coordinate = extractWire1Coordinates(wire2);

  const intersectionPoints = extractIntersectionPoints(
    wire1Coordinate,
    wire2Coordinate,
  );

  intersectionPoints.shift();

  const finalDistance = extractClosestDistance(intersectionPoints);

  console.log(finalDistance);
  
};

calculateClosestIntersection(
  "R75,D30,R83,U83,L12,D49,R71,U7,L72",
  "U62,R66,U55,R34,D71,R55,D58,R83",
);
