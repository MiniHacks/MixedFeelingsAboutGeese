import './App.css';

import { addDocument, collection  } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

import { useEffect } from 'react';

import { auth } from './firebase.js';

function App() {
  useEffect(() => {
    const a = signInAnonymously(auth);
    console.log(a)
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
