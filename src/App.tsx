import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/HomePage'));
const Destination = lazy(() => import('./pages/DestinationPage'));
const Crew = lazy(() => import('./pages/CrewPage'));
const Technology = lazy(() => import('./pages/TechnologyPage'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/technology" element={<Technology />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
