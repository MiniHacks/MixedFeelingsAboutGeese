import './App.css';

import { addDocument, collection  } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

import { useEffect, useState } from 'react';

import { auth } from './firebase.js';

function App() {

  const [userId, setUserId] = useState(0);

  const signIn = async () => {
    const user = await signInAnonymously(auth);
    setUserId(user.uid)
  }
  useEffect(() => {
    signIn()
  });


  return (
    <div className="App">
      <header className="App-header">
        Brilliant React Code
      </header>
    </div>
  );
}

export default App;
