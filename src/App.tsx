import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { signInAnonymously, UserCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import { Route, Routes } from "react-router-dom";
import { auth } from './firebase';

/*
import { teams } from './scripts/gen_docs'
import { setDoc, doc } from 'firebase/firestore';
*/
import { db } from './firebase';
import { getDoc, doc, DocumentData } from 'firebase/firestore';

import { EloPoint } from './models'
import Navigation from './components/navigation';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';

const App: React.FC = () => {

  const [user, setUser] = useState<UserCredential["user"] | undefined>();
  const [chartData, setChartData] = useState<Array<EloPoint> | []>();
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
    const docRef = doc(db, "team_info", "Minnesota Twins");
    const docSnap = await getDoc(docRef);

    const data: Array<EloPoint> = docSnap.data().elo_history;
    console.log(Array.isArray(data))
    setChartData(data)
  }
  /*
  const sendDocuments = () => {
    console.log("Sending documents!")
    teams.forEach(async team => {
      await setDoc(doc(db,"team_info", team.name), team)
    });
    console.log("Sent documents!")
  }
  <button onClick={sendDocuments}> Blast Off! </button>
  */

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
