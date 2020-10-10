import React, { useEffect } from 'react';

const Home = props => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return <h1>Building Up -- Home Page</h1>;
};

export default Home;
