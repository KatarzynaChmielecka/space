import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from './components/layout/Layout';
import Notes from './components/Notes';
import Photos from './components/Photos';
import Profile from './components/Profile';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

const Home = lazy(() => import('./pages/HomePage'));
const Destination = lazy(() => import('./pages/DestinationPage'));
const Crew = lazy(() => import('./pages/CrewPage'));
const Technology = lazy(() => import('./pages/TechnologyPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const Login = lazy(() => import('./pages/LoginPage'));
const User = lazy(() => import('./pages/UserPage'));
function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          token: token,
          login: login,
          userId: userId,
          logout: logout,
        }}
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user/:userId" element={<User />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
