import './App.css';

import { signInAnonymously } from 'firebase/auth';

import { useEffect, useState } from 'react';

import { auth } from './firebase.js';

function App() {

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(0);

  const signIn = async () => {
    const user = await signInAnonymously(auth);
    setUser(user)
    setUserId(user.uid)
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
