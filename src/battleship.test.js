import Ship from "./Ship";
import Board from "./Board";

test("Tests ship factory function to the hit and sink functions work", () => {
  const length = 3;
  const type = "DESTROYER";

  const boat = Ship(length, type);
  expect(boat.hit()).toBe("HIT!");
  expect(boat.hit()).toBe("HIT!");
  expect(boat.hit()).toBe("SUNK!");
  expect(boat.getSunk()).toBeTruthy();
});

test("Test that board factory function can create a board with ships", () => {
  const dim = 3;

  const testShip = Ship(3);
  const ships = [
    [
      testShip,
      [
        [0, 0],
        [1, 0],
      ],
    ],
  ];

  const p1Board = Board(dim, ships);
  expect(p1Board.initBoard()).toBeTruthy();
});

test("Test that the win condition works", () => {
  const dim = 3;

  const testShip = Ship(3);
  const ships = [
    [
      testShip,
      [
        [0, 0],
        [1, 0],
      ],
    ],
  ];

  const p1Board = Board(dim, ships);
  p1Board.initBoard();
  testShip.hit();
  testShip.hit();
  expect(testShip.hit()).toBe("SUNK!");
  expect(p1Board.checkWin()).toBeTruthy();
});

test("Test that the attack function works", () => {
  const dim = 3;
  const shipLength = 2;

  const testShip = Ship(shipLength);
  const testShip2 = Ship(shipLength);
  const ships = [
    [
      testShip,
      [
        [0, 0],
        [1, 0],
      ],
    ],
  ];

  const p1Board = Board(dim, ships);
  p1Board.initBoard();

  // This should hit ship
  const attack1 = [0, 0];
  expect(p1Board.receiveAttack(attack1)[0]).toBe(testShip);
  expect(testShip.getHealth()).toBe(shipLength - 1);

  // This should hit water (1 is the digit for water)
  const attack2 = [0, 1];
  expect(p1Board.receiveAttack(attack2)).toBe(1);

  // This should sink the ship
  const attack3 = [1, 0];
  expect(p1Board.receiveAttack(attack3)).toBeTruthy();
});
