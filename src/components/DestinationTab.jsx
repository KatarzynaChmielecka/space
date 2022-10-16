import PropTypes from 'prop-types';

const DestinationTab = ({ src, alt, name, description, distance, travel }) => {
  return (
    <>
      <img src={src} alt={alt} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{name}</h1>
        <p>{description}</p>
        <hr />
        <div style={{ display: 'flex' }}>
          <div>
            <p>AVG. DISTANCE</p>
            <p>{distance}</p>
          </div>
          <div>
            <p>EST. TRAVEL TIME</p>
            <p>{travel}</p>
          </div>
        </div>
      </div>
    </>
  );
};

DestinationTab.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  distance: PropTypes.string,
  travel: PropTypes.string,
};

export default DestinationTab;
