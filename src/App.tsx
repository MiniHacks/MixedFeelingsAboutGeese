import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { signInAnonymously, UserCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import { db } from "./firebase";
import { setDoc, getDoc, doc, DocumentData } from "firebase/firestore";

import { EloPoint, Team } from "./models";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";

const App: React.FC = () => {
  const [user, setUser] = useState<UserCredential["user"] | undefined>();
  const [chartData, setChartData] = useState<Team[]>();
  const [userId, setUserId] = useState("");

  const signIn = async () => {
    const credential: UserCredential = await signInAnonymously(auth);
    setUser(credential.user);
    setUserId(credential.user.uid);

    const userDoc = (
      await getDoc(doc(db, "users", credential.user.uid))
    ).data();
    if (userDoc === undefined) {
      await setDoc(doc(db, "users", credential.user.uid), {
        name: "Anonymous",
        miseryScore: 0,
        saved: false,
      });
    }
  };

  // mount loop (ideally)
  useEffect(() => {
    signIn();
    getChartData();
  }, []);

  const getChartData = async () => {
    const twins = (
      await getDoc(doc(db, "team_info", "Minnesota Twins"))
    ).data() as Team;
    const yankees = (
      await getDoc(doc(db, "team_info", "New York Yankees"))
    ).data() as Team;

    setChartData([twins, yankees]);
  };

  return (
    <div className="App-custom">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams auth={user} />} />
        <Route path="/results" element={<Leaderboard auth={userId} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
