import moon from '../assets/destination/image-moon.png';

interface ImageError {
  currentTarget: {
    onerror: null;
    src: string;
  };
}
export const errorImage = ({ currentTarget }: ImageError) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = moon;
};
