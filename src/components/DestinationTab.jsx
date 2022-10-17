import PropTypes from 'prop-types';

const DestinationTab = ({ src, alt, name, description, distance, travel }) => {
  return (
    <>
      <img src={src} alt={alt} style={{ margin: '0 160px 0 230px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', width: '445px' }}>
        <h1
          style={{
            textTransform: 'uppercase',
            fontSize: '100px',
            marginTop: '40px',
            marginBottom: '40px',
          }}
        >
          {name}
        </h1>
        <p
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '18px',
            lineHeight: '32px',
            fontWeight: '400',
            color: '#D0D6F9',
          }}
        >
          {description}
        </p>
        <hr style={{ border: '1px solid #383B4B' }} />
        <div style={{ display: 'flex' }}>
          <div>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              AVG. DISTANCE
            </p>
            <p>{distance}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              EST. TRAVEL TIME
            </p>
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
