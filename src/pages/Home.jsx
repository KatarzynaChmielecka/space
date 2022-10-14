const Home = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          margin: '0 10.31rem 8.13rem',
          alignItems: 'end',
          justifyContent: 'space-between',
          color: '#D0D6F9',
        }}
      >
        <div
          style={{
            width: '28.13rem',
            height: '23.88rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontSize: '1.75rem',
              letterSpacing: '0.3rem',
              fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            SO, YOU WANT TO TRAVEL TO
          </p>
          <h1 style={{ fontSize: '9.38rem', color: '#fff' }}>SPACE</h1>
          <p style={{ fontSize: '1.13rem', lineHeight: '2rem' }}>
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <div
          style={{
            width: '17.13rem',
            height: '17.13rem',
            background: '#fff',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: '#0B0D17',
              fontSize: '2rem',
            }}
          >
            EXPLORE
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
