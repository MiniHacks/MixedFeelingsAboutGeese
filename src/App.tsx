import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { signInAnonymously, UserCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import { Route, Routes } from "react-router-dom";
import { auth } from './firebase';

import { db } from './firebase';
import { getDoc, doc } from 'firebase/firestore';

import { EloPoint } from './models'
import Navigation from './components/navigation';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';

const App: React.FC = () => {

  const [user, setUser] = useState<UserCredential["user"] | undefined>();
  const [chartData, setChartData] = useState<Array<Array<EloPoint>> | []>();
  const [userId, setUserId] = useState("");

  const signIn = async () => {
    const credential: UserCredential = await signInAnonymously(auth);
    setUser(credential.user)
    setUserId(credential.user.uid)
    console.log(credential.user);
  }

  // mount loop (ideally)
  useEffect(() => {
    console.log("Setting up")
    signIn()
    getChartData()
  }, []);

  const getChartData = async () => {
    const twinsElo: Array<EloPoint> = (await getDoc(doc(db, "team_info", "Minnesota Twins"))).data().elo_history;
    const yankeesElo: Array<EloPoint> = (await getDoc(doc(db, "team_info", "New York Yankees"))).data().elo_history;

    setChartData([twinsElo, yankeesElo])
  }

  return (
    <div className="App-custom">
      <Chart series={chartData}/>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/teams' element={<Teams/>} />
        <Route path='/leaderboard' element={<Leaderboard/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </div>
  );
}

export default App;
