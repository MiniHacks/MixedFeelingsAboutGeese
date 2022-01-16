import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { signInAnonymously, UserCredential } from 'firebase/auth';
import { Route, Routes } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import { auth } from './firebase';

import Navigation from './components/navigation';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Leaderboard from './pages/Leaderboard';

const App: React.FC = () => {

  const [user, setUser] = useState<UserCredential["user"] | undefined>();
  const [userId, setUserId] = useState("");

  const signIn = async () => {
    const credential: UserCredential = await signInAnonymously(auth);
    setUser(credential.user)
    setUserId(credential.user.uid)
  }

  // mount loop (ideally)
  useEffect(() => {
    console.log("Setting up")
    signIn()
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/teams' element={<Teams/>} />
        <Route path='/leaderboard' element={<Leaderboard/>} />
      </Routes>
    </div>
  );
}

export default App;
