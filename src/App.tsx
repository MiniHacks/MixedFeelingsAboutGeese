import './App.css';

import { signInAnonymously, UserCredential } from 'firebase/auth';

import React, { useEffect, useState } from 'react';

import { auth } from './firebase.js';

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
      <header className="App-header">
        Brilliant React Code
      </header>
    </div>
  );
}

export default App;
