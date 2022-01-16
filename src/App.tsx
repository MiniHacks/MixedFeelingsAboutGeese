import './App.css';

import { signInAnonymously, UserCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';

import { auth } from './firebase';

/*
import { teams } from './scripts/gen_docs'
import { setDoc, doc } from 'firebase/firestore';
*/
import { db } from './firebase';
import { getDoc, doc, DocumentData } from 'firebase/firestore';

import { EloPoint } from './models'

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
    <div className="App">
      <header className="App-header">
        Brilliant React Code
        <Chart series={chartData}/>
      </header>
    </div>
  );
}

export default App;
