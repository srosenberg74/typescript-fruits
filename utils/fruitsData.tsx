interface FruitType {
  id: number;
  name: string;
  price: number;
}

const FruitsArray: FruitType[] = [
  {
    id: 1,
    name: "Mango",
    price: 10,
  },
  {
    id: 2,
    name: "PineApple",
    price: 20,
  },
  {
    id: 3,
    name: "Apple",
    price: 12,
  },
  {
    id: 4,
    name: "Orange",
    price: 7,
  },
];

let StarredFruitsArray: FruitType[] =
[];

export { FruitType, FruitsArray, StarredFruitsArray };
