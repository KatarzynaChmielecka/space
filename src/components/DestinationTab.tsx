import { DestinationTabInterface } from '../types/interfaces';

const DestinationTab = ({
  src,
  alt,
  name,
  description,
  distance,
  travel,
}: DestinationTabInterface) => {
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
        <hr style={{ border: '1px solid #383B4B', margin: '54px 0 28px 0' }} />
        <div style={{ display: 'flex', gap: '80px' }}>
          <div>
            <p
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                color: '#D0D6F9',
                fontSize: '14px',
              }}
            >
              AVG. DISTANCE
            </p>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '28px',
                textTransform: 'uppercase',
              }}
            >
              {distance}
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                color: '#D0D6F9',
                fontSize: '14px',
              }}
            >
              EST. TRAVEL TIME
            </p>
            <p
              style={{
                margin: '12px 0 0 0',
                fontSize: '28px',
                textTransform: 'uppercase',
              }}
            >
              {travel}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationTab;
