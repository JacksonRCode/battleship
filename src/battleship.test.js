import Ship from "./Ship";
import Board from "./Board";

test("Tests ship factory function to the hit and sink functions work", () => {
  const length = 3;
  const type = "DESTROYER";

  const boat = Ship(length, type);
  expect(boat.hit()).toBe("HIT!");
  expect(boat.hit()).toBe("HIT!");
  expect(boat.hit()).toBe("SUNK!");
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
