import './App.css';

import { Route, Routes } from 'react-router-dom';

import Crew from './pages/Crew';
import Destination from './pages/Destination';
import Home from './pages/Home';
import Layout from './components/layout/Layout';
import Technology from './pages/Technology';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
