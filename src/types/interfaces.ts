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
