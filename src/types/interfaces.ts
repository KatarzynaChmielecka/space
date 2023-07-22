export interface PlanetInterface {
  name: string;
  description: string;
  distance: string;
  travel: string;
}

export interface AltInterface extends PlanetInterface {
  alt: string;
  src: string;
}

export interface Response {
  status: number;
  data: { message: string };
}

export interface Note {
  _id: string;
  createdAt: string;
  text: string;
}
