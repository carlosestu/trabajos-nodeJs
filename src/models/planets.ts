export interface Planet {
  id: number;
  name: string;
}
export type Planets = Planet[];

export let planets: Planets = [
  {
    id: 1,
    name: "Mercurio",
  },
  {
    id: 2,
    name: "Venus",
  },
  {
    id: 3,
    name: "Tierra",
  },
  {
    id: 4,
    name: "Marte",
  },
  {
    id: 5,
    name: "Júpiter",
  },
  {
    id: 6,
    name: "Saturno",
  },
  {
    id: 7,
    name: "Urano",
  },
  {
    id: 8,
    name: "Neptuno",
  }
];
