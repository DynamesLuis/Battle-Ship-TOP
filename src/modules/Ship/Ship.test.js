import Ship from "./Ship";

describe.skip("Ship", () => {
  test("stores the length passed to the constructor", () => {
    const ship = new Ship(3);

    expect(ship.getLength()).toBe(3);
  });

  test("stores the name passed to the constructor", () => {
    const ship = new Ship(3, "carrier");

    expect(ship.getName()).toBe("carrier");
  });

  test("is not sunk when it is created", () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);
  });

  test("is not sunk until it receives enough hits", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test("is sunk after receiving hits equal to its length", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
