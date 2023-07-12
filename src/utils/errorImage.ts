import moon from '../assets/destination/image-moon.png';

interface X {
  currentTarget: {
    onerror: null;
    src: string;
  };
}
export const errorImage = ({ currentTarget }: X) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = moon;
};
