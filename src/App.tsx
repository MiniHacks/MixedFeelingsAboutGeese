import './App.css';

import { signInAnonymously, UserCredential } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';

import { auth, db } from './firebase';
import { teams } from './scripts/nhl_docs'

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
    teams.forEach(team => addDoc(collection(db,"teams"), team));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        Brilliant React Code
      </header>
    </div>
  );
}

export default App;
